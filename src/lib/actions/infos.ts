"use server"
import prisma from "@/lib/prisma";
import {UrgentInfo} from "@prisma/client";
import {revalidatePath} from "next/cache";

// Get Urgent Info
export const getUrgentInfo = async () => {
    return prisma.urgentInfo.findFirst();
};

export const createUrgentInfo = async (data: UrgentInfo) => {
    const res = prisma.urgentInfo.create({
        data
    })
    return {res}
}

export const removeUrgentInfo = async (id: string) => {
    return prisma.urgentInfo.delete(
        {
            where: {
                id: id
            }
        }
    )
}