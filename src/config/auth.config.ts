import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

export default {
    pages: {
        // error: "/auth/error",
        // verifyRequest: "/auth/verify-request",
        // newUser: "/auth/new-user",
        signIn: "/",
        signOut: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({
                         // user, account, profile, email, credentials
        }) {
            // console.log("signIn", {user, account, profile, email, credentials})
            return true;
        },
        async redirect({
                           // url,
                           baseUrl }) {
            // console.log("redirect", {url, baseUrl})
            return baseUrl;
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
        // @ts-ignore
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.phone = token.phone;
                session.user.address = token.address;
                session.user.birthdate = token.birthdate;
                session.user.gender = token.gender;
                session.user.image = token.image;
                session.user.createdAt = token.createdAt;
                session.user.updatedAt = token.updatedAt;
            }
            return session;
        },
    },
} satisfies NextAuthConfig;
