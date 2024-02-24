"use server"
import prisma from "@/lib/prisma";

export async function getCars() {
    try {
        const cars = await prisma.car.findMany(
            {
                select: {
                    ownerId: true,
                    brand: true,
                    model: true,
                    year: true,
                    color: true,
                    plateNumber: true,
                }
            }
        );
        return {cars};
    } catch (error) {
        return {error};
    }
}

export async function getCarById(id: string) {
    return prisma.car.findUnique({
        where: {id},
    });
}

export async function getCarByOwnerId(ownerId: string) {
    const cars = await prisma.car.findMany({
        where: {
            ownerId
        }
    });

    return {cars};
}