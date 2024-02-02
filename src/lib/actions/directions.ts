"use server"
import prisma from "@/lib/prisma";
import * as z from "zod";
import {DirectionScheme} from "@/lib/validation";

// find all directions
export const getDirections = async () => {
    try {
        return await prisma.direction.findMany({
            include: {
                CompanyDirections: true,
                stops: true
            }
        });
    } catch (error) {
        return null;
    }
}

//create direction
export const createDirection = async (data: z.infer<typeof DirectionScheme>) => {

    try {
        const directionData = DirectionScheme.parse({
            name: data.name as string,
            from: data.from as string,
            fromLat: data.fromLat as number,
            fromLong: data.fromLong as number,
            to: data.to as string,
            toLat: data.toLat as number,
            toLong: data.toLong as number,
            distance: data.distance as number,
            duration: data.duration as number,
            price: Number(data.price),
            stops: data.stops as string[],
        });

        const stops = directionData.stops?.map((stop) => {
            return {
                name: stop as string,
                lat: 0,
                long: 0,
            }
        });

        return await prisma.direction.create({
            data: {
                name: directionData.from + " - " + directionData.to,
                from: directionData.from as string,
                fromLat: directionData.fromLat as number,
                fromLong: directionData.fromLong as number,
                to: directionData.to as string,
                toLat: directionData.toLat as number,
                toLong: directionData.toLong as number,
                distance: directionData.distance as number,
                duration: directionData.duration as number,
                price: directionData.price as number,
                stops: {
                    create: stops,
                }
            },

            include: {
                CompanyDirections: true,
                stops: true,
            }
        });
    } catch (error) {
        return null;
    }
}