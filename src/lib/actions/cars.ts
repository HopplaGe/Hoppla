"use server"
import prisma from "@/lib/prisma";
import {getUserByEmail} from "@/lib/actions/user";

export const getCars = async () => {
    await prisma.car.findMany();
}

export const getCar = async (id: string) => {
    await prisma.car.findUnique({where: {id}});
}

export const getCarById = async (id: string) => {
    try {
        return await prisma.car.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        return null;
    }
}

export const getCarByPlate = async (plateNumber: string) => {
    await prisma.car.findFirst({where: {plateNumber}});
}

export const getCarByOwner = async (userId: string) => {
    try {
        return await prisma.car.findMany({where: {userId}});
    } catch (error) {
        console.log(error);
    }
}

export const getCarByBrand = async (brand: string) => {
    await prisma.car.findMany({where: {brand}});
}

export const getCarByModel = async (model: string) => {
    await prisma.car.findMany({where: {model}});
}

export const getCarByYear = async (year: number) => {
    await prisma.car.findMany({where: {year}});
}

export const getCarByColor = async (color: string) => {
    await prisma.car.findMany({where: {color}});
}

export const createCar = async (data: any, userEmail: string) => {
    const currentUser = await getUserByEmail(userEmail);

    try {
        return await prisma.car.create({
            data: {
                brand: data.brand,
                model: data.model,
                year: parseInt(data.year),
                color: data.color,
                plateNumber: data.plateNumber,
                user: {connect: {id: currentUser?.id}}
            },
            include: {
                user: true
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCar = async (id: string, data: any) => {
    await prisma.car.update({where: {id}, data});
}

export const deleteCar = async (id: string) => {
    return prisma.car.delete({where: {id}});
}