import { z } from 'zod';

const userNameRegex = /^[a-z0-9]{3,20}$/i;
const fullNameRegex = /^[a-zA-Z\s]+$/;

export const signUpSchema = z.object({
  username: z
    .string()
    .regex(userNameRegex, 'O username deve conter apenas letras e números')
    .min(3, 'O username deve ter pelo menos 3 caracteres')
    .toLowerCase(),
  fullName: z
    .string()
    .regex(fullNameRegex, 'O nome completo deve conter apenas letras e espaços')
    .min(5, 'O nome completo deve ter pelo menos 5 caracteres')
    .max(50, 'O nome completo deve ter no máximo 50 caracteres')
    .transform(text =>
      text
        .split(' ')
        .map(
          word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase(),
        )
        .join(' '),
    ),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 6 caracteres'),
});

export type TSignUpForm = z.infer<typeof signUpSchema>;
