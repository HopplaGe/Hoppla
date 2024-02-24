import prisma from "@/lib/prisma";

export const createRide = async (ride: any) => {
    try {
        return await prisma.ride.create({
            data: {
                ...ride,
                rideRules: {
                    create: ride.rideRules.map((rule: any) => {
                        return {
                            rule: {
                                connect: {
                                    id: rule,
                                },
                            },
                        };
                    }),
                },
            },
            include: {
                trip: true,
                driver: true,
                rideRules: true,
            },
        });
    } catch (error) {
        console.error(error);
    }
};