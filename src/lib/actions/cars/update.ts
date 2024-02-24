import prisma from "@/lib/prisma";

export const updateCar = async (data: any, id: string) => {
    try {
        return await prisma.car.update({
            where: {id: id},
            data: {
                brand: data.brand,
                model: data.model,
                year: parseInt(data.year),
                color: data.color,
                plateNumber: data.plateNumber,
            }
        });
    } catch (error) {
        console.log(error);
    }
}