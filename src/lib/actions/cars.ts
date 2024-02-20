"use server"
import prisma from "@/lib/prisma";
import {getUserByEmail} from "@/lib/actions/users";

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

export async function getCar(id: string) {
    return prisma.car.findUnique({
        where: {id},
    });
}

//get car by owner id
export async function getCarByOwnerId(ownerId: string) {
    const cars = await prisma.car.findMany({
        where: {
            ownerId
        }
    });

    return {cars};
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

// export const createCar = async (formData: FormData) => {
//     const owner = await getUserByEmail("traitwiki@gmail.com");
//     const brand = formData.get("brand") as string;
//     const model = formData.get("model") as string;
//     const year = Number(formData.get("year"));
//     const color = formData.get("color") as string;
//     const plateNumber = formData.get("plateNumber") as string;
//     const ownerId = owner?.id;
//     if (!ownerId) {
//         return {error: "Owner not found"};
//     }
//
//     console.log("ownerId", ownerId);
//     console.log("brand", brand);
//     console.log("model", model);
//     console.log("year", year);
//
//     // try {
//     //     // await prisma.car.create({
//     //     //     data: {
//     //     //         brand,
//     //     //         model,
//     //     //         year,
//     //     //         color,
//     //     //         plateNumber,
//     //     //         ownerId,
//     //     //     },
//     //     //     include: {
//     //     //         owner: true,
//     //     //     }
//     //     // });
//     //     //
//     //     // revalidatePath("/dashboard")
//     //
//     // } catch (error) {
//     //     return {error};
//     // }
//
// }