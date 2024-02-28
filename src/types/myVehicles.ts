export type myVehicles = {
    cars: {
        ownerId: string;
        brand: string;
        model: string;
        year: number;
        color: string;
        plateNumber: string;
        companyId: string | null;
    }[] | undefined;
}