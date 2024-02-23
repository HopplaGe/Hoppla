"use server";
import prisma from "@/lib/prisma";
import "moment/locale/ka";

import {getRides, getRidesByTo} from "./rides"
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

export async function getStats(userId: string) {

    // const cars = await prisma.car.count({
    //     where: {
    //         ownerId: userId
    //     }
    // });

    const rides = await prisma.ride.findMany({
        where: {
            driverId: userId,
            status: "COMPLETED"
        },
        select: {
            createdAt: true,
        }
    });

    const earnings = await prisma.ride.findMany({
        where: {
            driverId: userId,
            status: "COMPLETED"
        },
        select: {
            price: true,
            status: true,
            createdAt: true,
        }
    });

    //TODO: Rating and earnings statistics are to be added
    return [
        {
            title: "მგზავრობა",
            value: rides.length,
            compare: {
                percent: compareLastMonthRides(rides).status === "increase" ? `+${compareLastMonthRides(rides).percent}` : `-${compareLastMonthRides(rides).percent}` ? `0%` : `0%`,
                status: compareLastMonthRides(rides).status
            }
        },
        {
            title: "შემოსავალი",
            value: `${earnings.reduce((a, b) => a + b.price, 0).toFixed(2)} ₾`,
            compare: {
                percent: compareLastMonthEarnings(earnings).status === "increase" ? `+${compareLastMonthEarnings(earnings).percent}` : `-${compareLastMonthEarnings(earnings).percent}` ? parseFloat(compareLastMonthEarnings(earnings).percent) > 0 ? `-${compareLastMonthEarnings(earnings).percent}` : `0%` : `0%`,
                status: compareLastMonthEarnings(earnings).status
            }
        },
        // {
        //     title: "ავტომობილები",
        //     value: cars
        // },
        {
            title: "რეიტინგი",
            value: 4.5
        }
    ];
}