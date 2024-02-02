import * as z from 'zod';

const DirectionScheme = z.object({
    name: z.string().optional(),
    from: z.string().optional(),
    fromLat: z.number().optional(),
    fromLong: z.number().optional(),
    to: z.string().optional(),
    toLat: z.number().optional(),
    toLong: z.number().optional(),
    distance: z.number().optional(),
    price: z.number().optional(),
    duration: z.number().optional(),
    stops: z.array(z.string()).optional(),
});

export default DirectionScheme;