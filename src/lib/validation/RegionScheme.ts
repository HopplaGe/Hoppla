import * as z from 'zod';

const RegionSchema = z.object({
    name: z.string().min(2, {
        message: 'პუნქტის დასახელება სავალდებულოა'
    }),
    countryId: z.string(),
    svgCoords: z.string().optional(),
    isOccupied: z.boolean().optional()
});

export default RegionSchema;