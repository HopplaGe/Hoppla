"use server";

import prisma from "@/lib/prisma";
import {Ride, RideStatus} from "@prisma/client";
import { revalidatePath } from "next/cache";


export const getAllRides = async () => {
  try {
    return await prisma.ride.findMany({
      include: {
        driver: true,
        trip: {
          include: {
            passangers: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getRides = async (take?: number) => {
  try {
    return await prisma.ride.findMany({
      take: take || 10,
      include: {
        driver: true,
        trip: {
          include: {
            passangers: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getRideById = async (id: string) => {
    try {
        return await prisma.ride.findUnique({
            where: {
                id: id,
            },
            include: {
                driver: true,
                trip: {
                    include: {
                        passangers: true
                    }
                },
                rideRules: {
                    select: {
                        id: true,
                        rule: true,
                    },
                }
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesByDriver = async (driverId: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                driverId: driverId,
            },
            include: {
                driver: true,
                trip: {
                    include: {
                        passangers: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRideByPassenger = async (passengerId: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                trip: {
                    passangers: {
                        some: {
                            id: passengerId
                        }
                    }
                }
            },
            include: {
                driver: true,
                trip: {
                    include: {
                        passangers: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export const getRidesByFrom = async (from: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                from: from,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesByTo = async (to: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                to: {
                    contains: to,
                },
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesByDate = async (date: any) => {
    date.setUTCHours(0, 0, 0, 0)
    try {
        return await prisma.ride.findMany({
            where: {
                startDate: date,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesBySeats = async (seats: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                seats: seats,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesByCar = async (carId: string) => {
    try {
        return await prisma.ride.findMany({
            where: {
                carId: carId,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesByDistance = async (distance: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                distance: distance,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesByDuration = async (duration: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                duration: duration,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRidesByPrice = async (price: number) => {
    try {
        return await prisma.ride.findMany({
            where: {
                price: price,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRideByFromAndToAndDateAndSeats = async (data: any) => {
    console.log(data);
    try {
        const res = await prisma.ride.findMany({
            orderBy: {
                price: data.sort === "price-asc" ? "asc" : undefined,
                startTime: data.sort === "time-asc" ? "asc" : undefined,
            },
            where: {
                AND: [
                    {
                        from: {
                            contains: data.from,
                        },
                    },
                    {
                        to: {
                            contains: data.to,
                        },
                    },
                    {
                        startDate: new Date(data.date),
                    },
                    {
                        seats: {
                            gte: parseInt(data.seats),
                        },
                    },
                    {
                        driver: {
                            // ratings: {
                            //     some: {
                            //         rating: {
                            //             gte: 0,
                            //         },
                            //     },
                            // },
                            phone:
                                data.filter === "verified"
                                    ? {
                                        not: null,
                                    }
                                    : undefined,
                        },
                    },
                    // {
                    //     rideRules: {
                    //         some: {
                    //             ruleId: {
                    //                 in: data.rules
                    //                     ? data.rules.split(",")
                    //                     : undefined,
                    //             },
                    //         },
                    //     },
                    // },
                ],
            },
            include: {
                trip: {
                    include: {
                        passangers: true,
                    },
                },
                driver: {
                    include: {
                        _count: {
                            select: {
                                Rated: true,
                            },
                        },
                        Car: true,
                        Rated: {
                            select: {
                                rating: true,
                            },
                        },
                    },
                },
            },
        });
        revalidatePath("/");
        return res;
    } catch (error) {
        return null;
    }
};