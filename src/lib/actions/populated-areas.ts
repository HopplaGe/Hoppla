"use server"
import {PopulatedArea} from "@prisma/client";
import prisma from "../prisma";
import {PopulatedAreaStatus} from "@prisma/client";
import AreaSchema from '@/lib/validation/AreasScheme'
import {revalidatePath} from "next/cache";
import {action} from "@/lib/safe-action";

// Populated Areas
export const getAreas = async () => {
    const res = prisma.populatedArea.findMany({
        orderBy: {
            name: 'asc'
        },
        include: {
            region: true,
        }
    }).catch((e) => {
        return e
    });
    if (res) {
        return res
    }
}

// Populated Area by ID
export const getAreaById = async (id: string) => {
    return prisma.populatedArea.findUnique({
        where: {
            id
        }
    });
}

// Populated Area by Region ID
export const getAreasByRegionId = async (regionId: string) => {
    const res = prisma.populatedArea.findMany({
        where: {
            regionId
        },
        orderBy: {
            name: 'asc'
        },
        include: {
            region: true,
        }
    }).catch((e) => {
        return e
    });

    if (res) {
        return res
    }
}

// Populated Area by Status
export const getAreasByStatus = async (status: PopulatedAreaStatus) => {
    return prisma.populatedArea.findMany({
        where: {
            status
        }
    });
}

// Create, Update, Delete
export const createArea = action(AreaSchema, async (data) => {
    const res = prisma.populatedArea.create({
        data
    });

    revalidatePath('/')
    if (res) {
        return res
    }
});

export const updateArea = async (id: string, data: PopulatedArea) => {
    return prisma.populatedArea.update({
        where: {
            id
        },
        data
    });
}

export const deleteArea = async (id: string) => {
    return prisma.populatedArea.delete({
        where: {
            id
        }
    });
}


// Statestics

// Population
export const getPopulation = async () => {
    return prisma.populatedArea.aggregate({
        _sum: {
            population: true
        }
    });
}

// Area Count
export const getAreasCount = async () => {
    return prisma.populatedArea.count();
}

// Area Count by Region ID
export const getAreasCountByRegionId = async (regionId: string) => {
    return prisma.populatedArea.count({
        where: {
            regionId: regionId
        }
    });
}

// Area Count by Status
export const getAreasCountByStatus = async (status: PopulatedAreaStatus) => {
    return prisma.populatedArea.count({
        where: {
            status
        }
    });
}