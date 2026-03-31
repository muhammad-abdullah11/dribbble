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
        async jwt({ token, user, account, profile }) {
            if (user) {
                await dbConnect();
                let dbUser = await User.findOne({ email: user.email });
                
                if (!dbUser && user.email) {
                    dbUser = await User.create({
                        email: user.email,
                        fullName: user.name || (user as any).fullName || "User",
                        username: (user as any).username || user.email.split("@")[0] + Math.floor(Math.random() * 1000),
                        password: Math.random().toString(36).slice(-10),
                        avatarUrl: user.image || (user as any).avatarUrl,
                        isVerified: true
                    });
                }

                token.id = dbUser?._id?.toString() || user.id;
                token.username = dbUser?.username || (user as any).username;
                token.fullName = dbUser?.fullName || user.name;
                token.avatarUrl = dbUser?.avatarUrl || user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).username = token.username as string;
                (session.user as any).fullName = token.fullName as string;
                (session.user as any).avatarUrl = token.avatarUrl as string;
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
