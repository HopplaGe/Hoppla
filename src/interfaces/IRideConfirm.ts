import {User} from "@prisma/client";
import {IMyCars} from "@/interfaces/IMyCars";

export interface IRideConfirm {
    user: User | null,
    cars: IMyCars,
    searchParams: {
        from: string,
        to: string,
        distance: number,
        duration: number,
        price: string,
        seats: number,
    }
}