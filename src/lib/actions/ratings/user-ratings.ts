"use server"
import prisma from "@/lib/prisma";

export const getUserRatings = async (userId: string) => {
    const ratings = await prisma.userRating.findMany({
        where: {
            userId: userId
        },
        select: {
            rating: true,
            comment: true,
            createdAt: true,
            author: true
        }
    });

    const ratingAvg = ratings.reduce((a, b) => a + b.rating, 0) / ratings.length;

    return {
        ratingAvg: ratingAvg ? ratingAvg.toFixed(1) : 0,
        ratingCount: ratings.length,
        ratings: ratings
    };
}