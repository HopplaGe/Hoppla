import * as z from 'zod';

const LoginSchema = z.object({
    email: z.string().email({
        message: 'არასწორი ელ.ფოსტა'
    }),
    password: z.string().min(6, {
        message: 'პაროლი უნდა იყოს 6 სიმბოლოზე მეტი'
    })
});

export default LoginSchema;