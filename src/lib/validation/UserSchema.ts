import * as z from 'zod';

const UserSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    birthday: z.string().optional(),
});

export default UserSchema;