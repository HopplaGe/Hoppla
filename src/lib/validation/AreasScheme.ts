import { PopulatedAreaStatus } from '@prisma/client';
import * as z from 'zod';

const AreaSchema = z.object({
    name: z.string().min(2, {
        message: 'პუნქტის დასახელება სავალდებულოა'
    }),
    lat: z.string(),
    lng: z.string(),
    symbol: z.string(),
    status: z.nativeEnum(PopulatedAreaStatus, {
        required_error: 'პუნქტის ტიპი სავალდებულოა',
        invalid_type_error: 'არასწორი ტიპი',
    }),
    postalCode: z.string(),
    population: z.string(),
    region: z.string(),
});

export default AreaSchema;