import Google from "next-auth/providers/google"
import type {NextAuthConfig} from "next-auth"
import prisma from "@/lib/prisma";

export default {

    pages: {
        // error: "/auth/error",
        // verifyRequest: "/auth/verify-request",
        // newUser: "/auth/new-user",
        signIn: "/",
        signOut: "/",
    },
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            // console.log("signIn", {user, account, profile, email, credentials})
            return true
        },
        async redirect({url, baseUrl}) {
            // console.log("redirect", {url, baseUrl})
            return baseUrl
        },

        async jwt({token, user, trigger, session}) {
            if (trigger === "update") {
                return {...token, ...session.user};
            }
            return {...token, ...user};
        },
        // @ts-ignore
        async session({session, token}) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.phone = token.phone;
            session.user.address = token.address;
            session.user.birthdate = token.birthdate;
            return session;
        }
    }
} satisfies NextAuthConfig