"use server"
import prisma from "@/lib/prisma";
import {Region} from "@prisma/client";

export const getRegions = async () => {
    return prisma.region.findMany({
        include: {
            populatedAreas: true,
            country: true
        }
    });
}

export const getRegionById = async (id: string) => {
    return prisma.region.findUnique({
        where: {
            id
        }
    });
}

export const getRegionsByStatus = async (status: boolean) => {
    return prisma.region.findMany({
        where: {
            isOccupied: status
        }
    });
}

export const getRegionsByStatusCount = async (status: boolean) => {
    return prisma.region.count({
        where: {
            isOccupied: status
        }
    });
}

export const getRegionsByCountryId = async (countryId: string) => {
    return prisma.region.findMany({
        where: {
            countryId
        },
        include: {
            populatedAreas: true
        }
    });
}

export const createRegion = async (data: Region) => {
    return prisma.region.create({
        data
    });
}

export const updateRegion = async (id: string, data: Region) => {
    return prisma.region.update({
        where: {
            id
        },
        data
    });
}

export const deleteRegion = async (id: string) => {
    return prisma.region.delete({
        where: {
            id
        }
    });
}

// Statestics

export const getRegionsCount = async () => {
    return prisma.region.count();
}

export const getAreasCount = async () => {
    return prisma.populatedArea.count();
}

export const getAreasCountByRegionId = async (regionId: string) => {
    return prisma.populatedArea.count({
        where: {
            regionId: regionId
        }
    });
}

export const getUnoccupiedRegionsCount = async () => {
    return prisma.region.count({
        where: {
            isOccupied: false
        }
    });
}

export const getOccupiedRegionsCount = async () => {
    return prisma.region.count({
        where: {
            isOccupied: true
        }
    });
}