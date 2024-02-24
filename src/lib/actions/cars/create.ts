"use server"
import {getUserByEmail} from "@/lib/actions/users";
import prisma from "@/lib/prisma";

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
                owner: {connect: {id: currentUser?.id}}
            },
            include: {
                owner: true
            }
        });
    } catch (error) {
        console.log(error);
    }
}