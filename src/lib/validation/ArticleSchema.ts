import * as z from 'zod';

export default z.object({
    title: z.string().min(2, {
        message: 'სტატიის სათაური სავალდებულოა'
    }),
    content: z.string().min(2, {
        message: 'სტატიის შიგთავსი სავალდებულოა'
    }),
    heading: z.string().min(2, {
        message: 'სტატიის სათაური სავალდებულოა'
    }),
    language: z.enum(['EN', 'KA'], {
        required_error: 'ენა სავალდებულოა'
    }),
    picture: z.string().min(2, {
        message: "ფოტო სავალდებულოა"
    }),
    tags: z.array(z.string()),
});

