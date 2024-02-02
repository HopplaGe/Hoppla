export interface iRideAdd {
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
    driver: {
        id: string;
    };
    stops: {
        name: string;
    }[];
}