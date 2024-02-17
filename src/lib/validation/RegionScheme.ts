import * as z from 'zod';

const RegionSchema = z.object({
    name: z.string().min(2, {
        message: 'პუნქტის დასახელება სავალდებულოა'
    }),
    country: z.string().min(2, {
        message: 'ქვეყანა სავალდებულოა'
    }),
});

export default RegionSchema;