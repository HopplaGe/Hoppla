"use server"
import prisma from "@/lib/prisma";
import {compareLastMonthRides} from "@/lib/tools/compareLastMonthRides";
import {compareLastMonthEarnings} from "@/lib/tools/compareLastMonthEarnings";

export const getUserStats = async (userId: string) => {
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

    const ratings = await prisma.userRating.findMany({
        where: {
            userId: userId
        },
        select: {
            rating: true,
        }
    });

    const ratingAvg = ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;

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
            value: ratingAvg.toFixed(1),
        }
    ];
}