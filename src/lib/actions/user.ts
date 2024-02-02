"use server"
import prisma from "@/lib/prisma";
import * as z from "zod";
import {RegisterConfirmSchema, RegisterSchema, UserSchema} from "@/lib/validation";
import {Prisma} from ".prisma/client";
import EnumRoleFilter = Prisma.EnumRoleFilter;

import * as bcrypt from "bcrypt";
import {signIn} from "next-auth/react";

export const getUsers = async () => {
    try {
        return await prisma.user.findMany({
            include: {
                accounts: true,
                cars: true,
                ratings: true,
                rides: true,
                trips: true,
            }
        });
    } catch (error) {
        return null;
    }

}

// find user by id
export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                accounts: true,
                cars: true,
                // @ts-ignore
                ratings: true,
            }
        });
    } catch (error) {
        return null;
    }
}

// find user by email
export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    } catch (error) {
        return null;
    }
}

// find users with role
export const getUsersWithRole = async (role: EnumRoleFilter) => {
    try {
        return await prisma.user.findMany({
            where: {
                role,
            },
        });
    } catch (error) {
        return null;
    }
}

// get user auth provider
export const getUserAuthProvider = async (id: string) => {
    try {
        return await prisma.account.findFirst({
            where: {
                userId: id,
            }
        });
    } catch (error) {
        return null
    }
}

//user registration
export const registerUser = async (values: z.infer<typeof UserSchema>) => {
    try {
        const {email, password, name} = await RegisterSchema.parseAsync(values);

        if (!email || !password || !name) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (user) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                image: "https://gravatar.com/avatar",
                role: "USER",
                accounts: {
                    // @ts-ignore
                    create: {
                        provider: "credentials",
                        providerAccountId: Math.random().toString(36).substring(7).toString(),
                        type: "email",
                    },
                }
            },
            include: {
                accounts: true,
            },
        });

        if (!newUser) {
            return null;
        }

        await signIn("credentials", {
            email: newUser.email,
            password: newUser.password,
            callbackUrl: "/auth/new-user",
        });
    } catch (error) {
        console.log("ERROR", error);
    }
}

// Confirm registration
export const confirmRegistration = async (values: z.infer<typeof RegisterConfirmSchema>) => {
    try {
        const res = await prisma.user.update({
            where: {
                email: values.email,
            },
            data: {
                name: values.name,
                phone: values.phone,
                address: values.address,
                birthday: new Date(values.birthday).toISOString(),
            }
        });

        if (!res) {
            return null;
        } else {
            return res;
        }
    } catch (error) {
        console.log("ERROR", error);
    }
}

// Update user
export const updateUser = async (id: string, data: z.infer<typeof UserSchema>) => {
    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data,
        });
    } catch (error) {
        console.log("ERROR", error);
    }
}

// Update user password
export const updateUserPassword = async (id: string, data: {
    newPassword: string,
    confirmPassword: string,
}) => {

    const {newPassword, confirmPassword} = data;

    if (newPassword !== confirmPassword) {
        return null;
    }

    const password = await bcrypt.hash(newPassword, 10);

    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data: {
                password,
            },
        });
    } catch (error) {
        console.log("ERROR", error);
    }
}