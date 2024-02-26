"use server"
import {Client, TravelMode} from "@googlemaps/google-maps-services-js";

export const getDistanceToPlace = async (fromPointOne: string, fromPointTwo: string, toPointOne: string, toPointTwo: string) => {
    const client = new Client({});

    if (!fromPointOne || !fromPointTwo || !toPointOne || !toPointTwo) return console.error("Invalid parameters");

    try {
        const from = await client.distancematrix({
            params: {
                origins: [fromPointOne],
                destinations: [fromPointTwo],
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
            }
        })

        const to = await client.distancematrix({
            params: {
                origins: [toPointOne],
                destinations: [toPointTwo],
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
            }
        })

        return {
            fromDistance: from.data.rows[0].elements[0].distance.value,
            fromDuration: from.data.rows[0].elements[0].duration.value,
            toDistance: to.data.rows[0].elements[0].distance.value,
            toDuration: to.data.rows[0].elements[0].duration.value
        };
    } catch (error) {
        console.error(error);
    }
}