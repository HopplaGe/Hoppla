import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface IRidesCard {
    name: string
    description: string
    from: string
    to: string
    distance: number
    duration: number
    seats: number
    price: number
    startDate: string
    startTime: string
    driver: {
        email: string | null;
        image: string | StaticImport;
        name: string | null;
        phone: string | null;
        address: string | null;
        birthday: Date | null;
    }
    stops: {
        name: string;
    }[];
}