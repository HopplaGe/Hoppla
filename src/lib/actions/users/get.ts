"use server";
import prisma from "@/lib/prisma";

export const getUsers = async (take?: number) => {
  try {
    return prisma.user.findMany({
      take: take || 10,
      include: {
        Rating: true,
        Rated: true,
        Trip: true,
        Ride: true,
        Car: true,
        ownedCompany: true,
        workCompany: true,
        _count: {
          select: {
            Rating: true,
            Rated: true,
            Ride: true,
            Car: true,
            ownedCompany: true,
            workCompany: true,
          },
        },
      },
    });
  } catch (error) {
    return error;
  }
};
