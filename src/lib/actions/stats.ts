import prisma from "@/lib/prisma";
import moment from "moment";
import "moment/locale/ka";
import {compareLastMonthRides} from "@/lib/tools/compareLastMonthRides";
import {compareLastMonthEarnings} from "@/lib/tools/compareLastMonthEarnings";

export async function getStats(userId: string) {

    const cars = await prisma.car.count({
        where: {
            userId: userId
        }
    });

    const rides = await prisma.ride.findMany({
        where: {
            userId: userId,
            status: "COMPLETED"
        },
        select: {
            createdAt: true,
        }
    });

    const earnings = await prisma.ride.findMany({
        where: {
            userId: userId,
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
        {
            title: "ავტომობილები",
            value: cars
        },
        {
            title: "რეიტინგი",
            value: 4.5
        }
    ];
}

export async function getStatsAdmin() {

    const users = await prisma.user.findMany();

    const totalUsers = await prisma.user.count();

    const cars = await prisma.car.findMany();

    const totalCars = await prisma.car.count();

    const rides = await prisma.ride.findMany({
        where: {
            status: "COMPLETED"
        },
        select: {
            createdAt: true,
        }
    });

    const earnings = await prisma.ride.findMany({
        where: {
            status: "COMPLETED"
        },
        select: {
            price: true,
            status: true,
            createdAt: true,
        }
    });

    const ratings = await prisma.userRating.findMany();

    const totalRatings = await prisma.userRating.count();

    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // count users with createdAt in months array (0-11) and return array of objects, current year
    const usersByMonth = months.map(month => {
        return {
            name: moment().month(month).locale("ka").format("MMM"),
            count: {
                all: users.filter(user => typeof user.createdAt !== "undefined" && moment(user.createdAt).month() === month && moment(user.createdAt).year() === moment().year()).length,
                male: users.filter(user => typeof user.createdAt !== "undefined" && moment(user.createdAt).month() === month && moment(user.createdAt).year() === moment().year() && user.gender === "Male").length,
                female: users.filter(user => typeof user.createdAt !== "undefined" && moment(user.createdAt).month() === month && moment(user.createdAt).year() === moment().year() && user.gender === "Female").length,
            }
        }
    });

    const ridesByMonth = months.map(month => {
        return {
            name: moment().month(month).locale("ka").format("MMM"),
            count: rides.filter(ride => typeof ride.createdAt !== "undefined" && moment(ride.createdAt).month() === month && moment(ride.createdAt).year() === moment().year()).length
        }
    });

    const earningsByMonth = months.map(month => {
            return {
                name: moment().month(month).locale("ka").format("MMM"),
                count: `${earnings.filter(earning => typeof earning.createdAt !== "undefined" && moment(earning.createdAt).month() === month && moment(earning.createdAt).year() === moment().year()).reduce((a, b) => a + b.price, 0).toFixed(2)} ₾`
            }
        }
    );

    const carsByMonth = months.map(month => {
        return {
            name: moment().month(month).locale("ka").format("MMM"),
            count: cars.filter(car => typeof car.createdAt !== "undefined" && moment(car.createdAt).month() === month && moment(car.createdAt).year() === moment().year()).length
        }
    });

    const ratingsByMonth = months.map(month => {
        return {
            name: moment().month(month).locale("ka").format("MMM"),
            count: ratings.filter(rating => typeof rating.createdAt !== "undefined" && moment(rating.createdAt).month() === month && moment(rating.createdAt).year() === moment().year()).length
        }
    });

    return [
        {
            title: "Rides",
            value: rides.length,
            chart: {
                data: ridesByMonth,
                color: "#FFC107",
                type: "line"
            },
            compare: {
                percent: compareLastMonthRides(rides).status === "increase" ? `+${compareLastMonthRides(rides).percent}` : `-${compareLastMonthRides(rides).percent}` ? `0%` : `0%`,
                status: compareLastMonthRides(rides).status
            }
        },
        {
            title: "Earnings",
            value: `${earnings.reduce((a, b) => a + b.price, 0).toFixed(2)} ₾`,
            chart: {
                data: earningsByMonth,
                color: "#4CAF50",
                type: "bar"
            },
            compare: {
                percent: compareLastMonthEarnings(earnings).status === "increase" ? `+${compareLastMonthEarnings(earnings).percent}` : `-${compareLastMonthEarnings(earnings).percent}` ? parseFloat(compareLastMonthEarnings(earnings).percent) > 0 ? `-${compareLastMonthEarnings(earnings).percent}` : `0%` : `0%`,
                status: compareLastMonthEarnings(earnings).status
            }
        },
        {
            title: "Users",
            value: totalUsers,
            chart: {
                data: usersByMonth,
                color: "#2196F3",
                color2: "#d946ef",
                type: "pie"
            }
        },
        {
            title: "Cars",
            value: totalCars,
            chart: {
                data: carsByMonth,
                color: "#E91E63",
                type: "bar"
            }
        },
        {
            title: "Ratings",
            value: totalRatings,
            chart: {
                data: ratingsByMonth,
                color: "#6C48B0",
                type: "bobble"
            }
        },
    ];
}