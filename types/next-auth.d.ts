import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            fullName: string;
            avatarUrl: string;
        } & DefaultSession["user"];
    }

    interface User {
        username: string;
        fullName: string;
        avatarUrl: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        fullName: string;
        avatarUrl: string;
    }
}
