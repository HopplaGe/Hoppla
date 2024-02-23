"use server"

import prisma from "@/lib/prisma"
import {Ride, RideStatus} from "@prisma/client"
import {revalidatePath} from "next/cache";
import {rule} from "postcss";

export const getRides = async () => {
    try {
        return await prisma.ride.findMany();
    } catch (error) {
        console.error(error)
    }
}

export const getRide = async (id: string) => {
    try {
        return await prisma.ride.findUnique({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRideById = async (id: string) => {
    try {
        return await prisma.ride.findUnique({
            where: {
                id: id
            },
            include: {
                trip: {
                    include: {
                        passangers: true
                    }
                },
                driver: true,
                rideRules: {
                    select: {
                        id: true,
                        rule: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesByDriver = async (driverId: string) => {
    try {
        const rides = await prisma.ride.findMany({
            where: {
                driverId: driverId
            },
            select: {
                id: true,
                from: true,
                to: true,
                startDate: true,
                startTime: true,
                duration: true,
                distance: true,
                price: true,
                seats: true,
                status: true,
                trip: true
            }
        });

        const driver = await prisma.user.findUnique({
            where: {
                id: driverId
            }
        });

        return {
            rides: rides,
            driver: driver
        };
    } catch (error) {
        console.error(error)
    }
}

// export const getRidesByPassenger = async (passengerId: string) => {
//     try {
//         return await prisma.ride.findMany({
//             where: {
//                 trip: {
//                     passengers: {
//                         some: {
//                             id: passengerId
//                         }
//                     }
//                 }
//             }
//         });
//     } catch (error) {
//         console.error(error)
//     }
// }

export const getRidesByFrom = async (from: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                from: from
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesByTo = async (to: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                to: {
                    contains: to
                },
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesByDate = async (date: Date) => {
    try {
        return await prisma.ride.findMany({
            where: {
                startDate: date
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesBySeats = async (seats: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                seats: seats
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesByCar = async (carId: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                carId: carId
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesByDistance = async (distance: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                distance: distance
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesByDuration = async (duration: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                duration: duration
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRidesByPrice = async (price: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                price: price
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const getRideByFromAndToAndDateAndSeats = async (data: any) => {
    console.log(data)
    try {
        const res = await prisma.ride.findMany({
            orderBy: {
                price: data.sort === 'price-asc' ? 'asc' : undefined,
                startTime: data.sort === 'time-asc' ? 'asc' : undefined,
            },
            where: {
                AND: [
                    {
                        from: {
                            contains: data.from
                        }
                    },
                    {
                        to: {
                            contains: data.to
                        }
                    },
                    {
                        startDate: new Date(data.date)
                    },
                    {
                        seats: {
                            gte: parseInt(data.seats)
                        }
                    },
                    {
                        driver: {
                            ratings: {
                                some: {
                                    rating: {
                                        gte: 4
                                    }
                                },
                            },
                            phone: data.filter === 'verified' ? {
                                not: null
                            } : undefined,
                        }
                    },
                    {
                        rideRules: {
                            some: {
                                ruleId: {
                                    in: data.rules ? data.rules.split(",") : undefined
                                }
                            }
                        }
                    }
                ],
            },
            include: {
                trip: {
                    include: {
                        passangers: true
                    }
                },
                driver: {
                    include: {
                        _count: {
                            select: {
                                ratings: true
                            }
                        },
                        Car: true,
                        ratings: {
                            select: {
                                rating: true,
                            }
                        },
                    }
                },
            }
        });
        revalidatePath('/')
        return res;

    } catch (error) {
        return null;
    }
}

export const createRide = async (ride: any) => {
    // console.log(ride.rideRules.map(
    //     (rule: any) => rule
    // ))
    try {
        return await prisma.ride.create({
            data: {
                ...ride,
                rideRules: {
                    create: ride.rideRules.map(
                        (rule: any) => {
                            return {
                                rule: {
                                    connect: {
                                        id: rule
                                    }
                                }
                            }
                        }
                    )
                }
            },
            include: {
                trip: true,
                driver: true,
                rideRules: true
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const updateRide = async (ride: Ride) => {
    try {
        await prisma.ride.update({
            where: {
                id: ride.id
            },
            data: ride
        });
    } catch (error) {
        console.error(error)
    }
}

export const updateRideStatus = async (id: string, status: string) => {
    try {
        await prisma.ride.update({
            where: {
                id: id
            },
            data: {
                status: status as RideStatus
            }
        });
    } catch (error) {
        console.error(error)
    }
}

export const deleteRide = async (id: string) => {
    try {
        await prisma.ride.delete({
            where: {
                id: id
            }
        });
    } catch (error) {
        console.error(error)
    }
}