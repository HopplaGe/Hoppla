"use server";
import prisma from "@/lib/prisma";
import {z} from "zod";
import {userUpdateSchema} from "../validation/UserUpdateSchema";

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
};

// find user by id

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                Car: true,
                Ride: true,
                Trip: true,
                Rating: true,
                Rated: true,
            }
        });
    } catch (error) {
        return null;
    }
};

export const updateUser = async (
    id: string,
    values: z.infer<typeof userUpdateSchema>
) => {
    try {
        return await prisma.user.update({
            where: {
                id,
            },
            data: values,
        });
    } catch (error) {
        return null;
    }
};
