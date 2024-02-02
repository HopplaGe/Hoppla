import * as z from 'zod';

const SearchSchema = z.object({
    startLocation: z.string(),
    endLocation: z.string(),
    startDate: z.date(),
    seats: z.number(),
    sort: z.string().optional(),
});

export default SearchSchema;