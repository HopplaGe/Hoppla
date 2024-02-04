import Google from "next-auth/providers/google"
import type {NextAuthConfig} from "next-auth"
import prisma from "@/lib/prisma";

export default {

    pages: {
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user",
    },
    providers: [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })],
    callbacks: {
        // async signIn({user, account, profile, email, credentials}) {
        //     // console.log("signIn", {user, account, profile, email, credentials})
        //     return true
        // },
        // async redirect({url, baseUrl}) {
        //     // console.log("redirect", {url, baseUrl})
        //     return baseUrl
        // },
        // //@ts-ignore
        // async session({session, token}) {
        //     if (token) {
        //         session.user.id = token.sub
        //         session.user.name = token.name
        //         session.user.email = token.email
        //         session.user.image = token.image
        //         session.user.role = token.role
        //         session.user.address = token.address
        //         session.user.phone = token.phone
        //         session.user.birthdate = token.birthdate
        //         session.user.gender = token.gender
        //     }
        //     return session
        // },
        // async jwt({token, user, account, profile, isNewUser}) {
        //     // console.log("jwt", {token, user, account, profile, isNewUser})
        //     const dbUser = await prisma.user.findFirst({
        //         where: {
        //             email: user?.email,
        //         },
        //     })
        //
        //     if (!dbUser) {
        //         token.id = user!.id
        //         return token
        //     }
        //
        //     return {
        //         id: dbUser.id,
        //         name: dbUser.name,
        //         email: dbUser.email,
        //         image: dbUser.image,
        //         role: dbUser.role,
        //         address: dbUser.address,
        //         phone: dbUser.phone,
        //         birthdate: dbUser.birthdate,
        //         gender: dbUser.gender
        //     }
        // }
    }
} satisfies NextAuthConfig