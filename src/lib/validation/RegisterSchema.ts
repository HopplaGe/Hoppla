import * as z from 'zod';

const RegisterSchema = z.object({
    name: z.string().min(3, {
        message: 'სახელი უნდა იყოს 3 სიმბოლოზე მეტი'
    }),
    email: z.string().email({
        message: 'არასწორი ელ.ფოსტა'
    }),
    password: z.string().min(6, {
        message: 'პაროლი უნდა იყოს 6 სიმბოლოზე მეტი'
    })
});

export default RegisterSchema;