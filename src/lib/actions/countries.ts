"use server"
import prisma from "@/lib/prisma";

export const getCountries: () => Promise<any[]> = async () => {
    return prisma.country.findMany();
}

export const getCountry = async (id: string): Promise<any> => {
    return prisma.country.findUnique({
        where: {id},
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