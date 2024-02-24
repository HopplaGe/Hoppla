"use server";
import prisma from "@/lib/prisma";
import "moment/locale/ka";

import {getRides, getRidesByTo} from "./rides/get"
import {compareLastMonthRides} from "../tools/compareLastMonthRides";
import {compareLastMonthEarnings} from "../tools/compareLastMonthEarnings";

export const allRidesCount = async () => {
    const rides = await getRides();
    return rides?.length;
}

export const ridesCountByDirection = async (to: string) => {
    const rides = await getRidesByTo(to);
    return rides?.length;
}

export const ridesCountByDriver = async (driverId: string) => {
    try {
        const res = await prisma.ride.findMany({
            where: {
                driverId: driverId
            }
        });
        return res.length;
    } catch (error) {
        return error;
    }
}