import * as z from 'zod';

const RegisterConfirmSchema = z.object({
    name: z.string().min(3, {
        message: 'სახელი უნდა იყოს 3 სიმბოლოზე მეტი'
    }),
    email: z.string().email({
        message: 'არასწორი ელ.ფოსტა'
    }),
    phone: z.string().min(9, {
        message: 'ნომერი უნდა იყოს 9 სიმბოლოზე მეტი'
    }),
    address: z.string().min(3, {
        message: 'მისამართი უნდა იყოს 3 სიმბოლოზე მეტი'
    }),
    birthday: z.string().min(3, {
        message: 'დაბადების თარიღი უნდა იყოს 3 სიმბოლოზე მეტი'
    }),
});

export default RegisterConfirmSchema;