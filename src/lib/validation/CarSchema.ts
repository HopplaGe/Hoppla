import * as z from 'zod';

const CarSchema = z.object({
    brand: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    color: z.string().optional(),
    plateNumber: z.string().optional(),
});

export default CarSchema;