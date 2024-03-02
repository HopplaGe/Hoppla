"use server"
import prisma from "@/lib/prisma";

export const getCompanies = async () => {
  try {
    return await prisma.company.findMany({
      orderBy: {
        createdAt: "asc",
      },
      include: {
        owner: true,
        cars: true,
        drivers: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const createCompany = async (data: any) => {
  try {
    return await prisma.rule.create({
      data,
    });
  } catch (error) {
    console.error(error);
  }
};