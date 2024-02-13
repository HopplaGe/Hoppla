"use server"
import prisma from "@/lib/prisma";


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

// find user by id

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        return null;
    }
}