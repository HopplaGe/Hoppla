import {NextAuthOptions} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import login from "@/lib/auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import {getUserById} from "@/lib/actions/user";
import {redirect} from "next/navigation";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder: "johndoe@hoppla.ge"},
                password: {label: "Password", type: "password", placeholder: "••••••"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const user = await login(credentials.email, credentials.password);
                    if (!user) return null;
                    return user;

                } catch (e) {
                    console.log(e);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role ? profile.role : "USER",
                    phone: profile.phone,
                    address: profile.address,
                    birthday: profile.birthday,
                };
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: profile.role ? profile.role : "USER",
                    phone: profile.phone,
                    address: profile.address,
                    birthday: profile.birthday,
                };
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture.data.url,
                    role: profile.role ? profile.role : "USER",
                };
            }
        }),
    ],
    events: {
        // async signIn({user, isNewUser}) {
        //     console.log("signIn", isNewUser);
        // },
        // async createUser({user}) {
        //     console.log("createUser", user);
        // },
        // async linkAccount({user}) {
        //     console.log("linkAccount", user);
        // },
        // async session({session, token}) {
        //     // if (token?.phone === null || token?.address === null || token?.birthday === null) {
        //     //     // return redirect(`${process.env.NEXTAUTH_URL}/auth/new-user`)
        //     //     console.log("redirect");
        //     // }
        // }
    },
    callbacks: {
        async signIn({user}) {
            const existingUser = await getUserById(user.id);

            return true;
        },
        async jwt({token, user, trigger, session}) {
            if (trigger === "update") {
                return {...token, ...session.user};
            }
            return {...token, ...user};
        },
        async session({session, token}) {
            session.user.role = token.role;
            session.user.phone = token.phone;
            session.user.address = token.address;
            session.user.birthday = token.birthday;
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: "/auth/new-user",
    },
};