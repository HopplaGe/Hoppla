"use server"
import prisma from "@/lib/prisma";

export async function getAllRules() {
    try {
        return await prisma.rule.findMany();
    } catch (error) {
        return {error};
    }
}