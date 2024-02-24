import {Ride, RideStatus} from "@prisma/client";
import prisma from "@/lib/prisma";

export const updateRide = async (ride: Ride) => {
    try {
        await prisma.ride.update({
            where: {
                id: ride.id,
            },
            data: ride,
        });
    } catch (error) {
        console.error(error);
    }
};

export const updateRideStatus = async (id: string, status: string) => {
    try {
        await prisma.ride.update({
            where: {
                id: id,
            },
            data: {
                status: status as RideStatus,
            },
        });
    } catch (error) {
        console.error(error);
    }
};