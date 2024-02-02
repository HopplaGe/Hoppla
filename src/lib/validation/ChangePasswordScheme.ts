import * as z from 'zod';

const ChangePasswordScheme = z.object({
    newPassword: z.string().min(6, {
        message: 'პაროლი უნდა იყოს 6 სიმბოლოზე მეტი'
    }),
    confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'პაროლები არ ემთხვევა',
    path: ['confirmPassword']
});

export default ChangePasswordScheme;