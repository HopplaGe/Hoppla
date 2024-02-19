import {meterToKm} from "@/lib/tools/meterToKm";

export const calculatePrice = (distance: number, duration: number): number => meterToKm(distance) * 0.3 * 2 / 4