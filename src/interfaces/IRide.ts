import {StaticImport} from "next/dist/shared/lib/get-img-props";

export interface IRide {
    id: string;
    name: string;
    description: string | null;
    from: string;
    to: string;
    distance: number;
    duration: number;
    seats: number;
    price: number;
    startDate: string;
    startTime: string;
    carId: string;
    driver: {
        email: string | null;
        image: string | StaticImport;
        name: string | null;
        phone: string | null;
        address: string | null;
        birthday: Date | null;
    };
    stops: {
        name: string;
    }[];
    rules: {
        id: string;
    }[];
}

//
// ride: {
//     id: string;
//     startDate: Date | string;
//     startTime: string;
//     name: string;
//     driver: {
//         name: string | null;
//         email: string | null;
//         image: string;
//         phone: string | null;
//         address: string | null;
//         birthday: Date | null;
//     };
//     from: string;
//     to: string;
//     duration: number;
//     seats: number;
//     // car: string;
//     // color: string;
//     price: number;
//     // passengers: {
//     //     name: string;
//     //     imageUrl: string;
//     // }[],
//     stops: { name: string; }[]
// }