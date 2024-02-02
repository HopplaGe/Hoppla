export interface IMyCars {
    cars: {
        id: string;
        userId: string;
        brand: string;
        model: string;
        year: number;
        color: string;
        plateNumber: string;
        createdAt: Date;
    }[]
}