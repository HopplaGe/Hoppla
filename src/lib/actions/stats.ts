"use server";

import { getRides, getRidesByTo } from "./rides"

export const allRidesCount = async () => {
    const rides = await getRides();
    return rides?.length;
}

export const ridesCountByDirection = async (to: string) => {
    const rides = await getRidesByTo(to);
    return rides?.length;
}