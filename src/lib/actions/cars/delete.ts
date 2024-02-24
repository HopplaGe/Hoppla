import prisma from "@/lib/prisma";

export const deleteCar = async (id: string) => {
    try {
        return await prisma.car.delete({
            where: {id: id}
        });
    } catch (error) {
        console.log(error);
    }
}