import { z } from "zod";

export const userUpdateSchema = z.object({
    name: z.string().min(2).max(50),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    image: z.string(),
    address: z.string().min(2).max(50),
    phone: z.string().min(2).max(50),
    birthdate: z.date(),
});
