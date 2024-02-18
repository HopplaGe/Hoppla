"use server"
import prisma from "@/lib/prisma";

export const getCountries: () => Promise<any[]> = async () => {
    return await prisma.country.findMany();
}

export const getCountry = async (id: string): Promise<any> => {
    return await prisma.country.findUnique({
        where: { id },
        include: {
            regions: {
                include: {
                    populatedAreas: true,
                    country: true
                }
            }
        }
    });
}