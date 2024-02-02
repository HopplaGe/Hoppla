"use server"
import prisma from "@/lib/prisma";
import {redirect} from 'next/navigation'
import moment from "moment";
import {sortUnique} from "@/lib/tools/sortUnique";

// find all rides
export const getRides = async () => {
    try {
        return await prisma.ride.findMany({
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// find ride by id
export const getRideById = async (id: string) => {
    try {
        return await prisma.ride.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        return null;
    }
}

// find ride by date
export const getRideByDate = async (date: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                startDate: date.split('T')[0],
            },
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// find ride by driver id
export const getRideByDriverId = async (id: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                userId: id,
            },
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// find ride by from and to
export const getRideByFromAndTo = async (from: string | undefined, to: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                from,
                to
            },
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// find ride by from and to and date and seats
export const getRideByFromAndToAndDateAndSeats = async (from: string | undefined, to: string, date: string, seatsNumber: number, sort?: string,) => {

    try {
        return await prisma.ride.findMany({
            orderBy: {
                price: sort === 'price-asc' ? 'asc' : undefined,
                startTime: sort === 'time-asc' ? 'asc' : undefined,
            },
            where: {
                from,
                to,
                startDate: date.split('T')[0],
                seats: {
                    gte: seatsNumber
                }
            },
            include: {
                driver: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                        phone: true,
                        address: true,
                        birthday: true,
                    }
                },
                stops: {
                    select: {
                        name: true,
                    }

                }
            }
        });
    } catch (error) {
        return null;
    }
}

// create ride
export const addRide = async (data: any) => {
    await prisma.ride.create({
        data: {
            ...data,
            driver: {
                connect: {
                    id: data.driver.id
                }
            },
            stops: {
                create: data.stops
            }
        },
        include: {
            driver: true,
            stops: true
        }
    });

    redirect('/carpool')
}

export const getRideLinks = async () => {
    const rides = await getRideByDate(moment(new Date()).format("YYYY-MM-DD"))

    const ridesArray = rides?.map((ride) => ride?.name)

    return sortUnique(ridesArray)?.map((ride: any) => (
        {
            rideName: ride,
            rideCount: ridesArray?.filter((rideName) => rideName === ride).length,
            rideFrom: ride.split(' -')[0],
            rideTo: ride.split('- ')[1],
        }
    ))
}