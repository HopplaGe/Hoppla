// import NextAuth from "next-auth";
// import { User } from "next-auth";
// import { JWT } from "next-auth/jwt";

import { User as PrismaUser } from "@prisma/client";

declare module "next-auth/jwt" {
    type JWT = PrismaUser;
}

declare module "next-auth" {
    interface User extends PrismaUser {}

    interface Session {
        user: User;
    }
}
