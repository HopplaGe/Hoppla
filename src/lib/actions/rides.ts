"use server"

import prisma from "@/lib/prisma"
import {Ride, RideStatus} from "@prisma/client"

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
                passangers: true
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
                passangers: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        image: true
                    }
                }
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

export const getRidesByPassenger = async (passengerId: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                passangers: {
                    some: {
                        id: passengerId
                    }
                }
            }
        });
    } catch (error) {
        console.error(error)
    }
}

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

export const getRideByFromAndToAndDateAndSeats = async (from: string, to: string, date: string, seatsNumber: number, sort?: string,) => {
    try {
        return await prisma.ride.findMany({
            // orderBy: {
            //     price: sort === 'price-asc' ? 'asc' : undefined,
            //     startTime: sort === 'time-asc' ? 'asc' : undefined,
            // },
            where: {
                from: {
                    contains: from
                },
                to: {
                    contains: to
                },
                // startDate: new Date(date),
                // seats: {
                //     gte: seatsNumber
                // }
            },
            include: {
                passangers: true
            }
        });
    } catch (error) {
        return null;
    }
}

export const createRide = async (ride: Ride) => {
    try {
        return await prisma.ride.create({
            data: ride
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