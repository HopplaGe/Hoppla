"use server";
import prisma from "@/lib/prisma";

export const getAllStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalRides = await prisma.ride.count();
  const totalRevenue = await prisma.ride.aggregate({
    _sum: {
      price: true,
    },
  });

  return [
    {
      name: "TotalUsers",
      value: totalUsers,
      change: "+4.75%",
      changeType: "positive",
    },
    {
      name: "TotalRides",
      value: totalRides,
      change: "+54.02%",
      changeType: "negative",
    },
    {
      name: "TotalRevenue",
      value: totalRevenue._sum.price,
      change: "-1.39%",
      changeType: "positive",
    },
    {
      name: "TotalCashOuts",
      value: "$30,156.00",
      change: "+10.18%",
      changeType: "negative",
    },
  ];
};
