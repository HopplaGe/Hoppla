"use server"
import prisma from "@/lib/prisma";
import { Region } from "@prisma/client";

export const getRegions = async () => {
   return await prisma.region.findMany({
       include: {
          populatedAreas: true,
          country: true
       }
   });
}

export const getRegionById = async (id: string) => {
    return await prisma.region.findUnique({
        where: {
            id
        }
    });
}

export const getRegionsByStatus = async (status: boolean) => {
    return await prisma.region.findMany({
        where: {
            isOccupied: status
        }
    });
}

export const getRegionsByStatusCount = async (status: boolean) => {
    return await prisma.region.count({
        where: {
            isOccupied: status
        }
    });
}

export const createRegion = async (data: Region) => {
    return await prisma.region.create({
        data
    });
}

export const updateRegion = async (id: string, data: Region) => {
    return await prisma.region.update({
        where: {
            id
        },
        data
    });
}

export const deleteRegion = async (id: string) => {
    return await prisma.region.delete({
        where: {
            id
        }
    });
}

// Statestics

export const getRegionsCount = async () => {
    return await prisma.region.count();
}

export const getAreasCount = async () => {
    return await prisma.populatedArea.count();
}

export const getAreasCountByRegionId = async (regionId: string) => {
    return await prisma.populatedArea.count({
        where: {
            regionId: regionId
        }
    });
}

export const getUnoccupiedRegionsCount = async () => {
    return await prisma.region.count({
        where: {
            isOccupied: false
        }
    });
}

export const getOccupiedRegionsCount = async () => {
    return await prisma.region.count({
        where: {
            isOccupied: true
        }
    });
}