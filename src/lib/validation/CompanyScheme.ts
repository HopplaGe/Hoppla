import * as z from 'zod';

const CompanyScheme = z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    logo: z.string().optional(),
    description: z.string().optional(),
});

export default CompanyScheme;