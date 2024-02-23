"use server"
import prisma from "@/lib/prisma";

export const getCompanies = async () => {
    try {
        return await prisma.rule.findMany();
    } catch (error) {
        console.error(error)
    }
}

export const createCompany = async (data: any) => {
    try {
        return await prisma.rule.create({
            data
        });
    } catch (error) {
        console.error(error)
    }
}