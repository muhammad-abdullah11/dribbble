import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/user.model";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error("Please enter all fields");
                }

                const user = await User.findOne({
                    $or: [
                        { email: credentials.identifier.toLowerCase() },
                        { username: credentials.identifier.toLowerCase() }
                    ]
                }).select("+password");

                if (!user || !user.password) {
                    throw new Error("No user found with these credentials");
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.fullName,
                    username: user.username,
                    avatarUrl: user.avatarUrl,
                    fullName: user.fullName,
                    profilePicture: user.profilePicture,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = (user as any).username;
                token.fullName = (user as any).fullName;
                token.profilePicture = (user as any).profilePicture;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.fullName = token.fullName as string;
                session.user.avatarUrl = token.avatarUrl as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
