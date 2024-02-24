import prisma from "@/lib/prisma";

export const deleteRide = async (id: string) => {
    try {
        await prisma.ride.delete({
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.error(error);
    }
};
