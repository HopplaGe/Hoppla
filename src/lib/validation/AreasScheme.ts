import { PopulatedAreaStatus } from '@prisma/client';
import * as z from 'zod';

const AreaSchema = z.object({
    name: z.string().min(2, {
        message: 'პუნქტის დასახელება სავალდებულოა'
    }),
    lat: z.preprocess(
        (value) => {
            if (typeof value === 'string') {
                return parseFloat(value);
            }
            return value;
        },
        z.number()
    ),
    lng: z.preprocess(
        (value) => {
            if (typeof value === 'string') {
                return parseFloat(value);
            }
            return value;
        },
        z.number()
    ),
    symbol: z.string(),
    status: z.nativeEnum(PopulatedAreaStatus, {
        required_error: 'პუნქტის ტიპი სავალდებულოა',
        invalid_type_error: 'არასწორი ტიპი',
    }),
    postalCode: z.string(),
    population: z.preprocess(
        (value) => {
            if (typeof value === 'string') {
                return parseFloat(value);
            }
            return value;
        },
        z.number()
    ).optional(),
    isCapital: z.boolean(),
    regionId: z.string(),
});

export default AreaSchema;