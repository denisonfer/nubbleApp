import { z } from 'zod';

import { stringUtils } from '@utils';

const userNameRegex = /^[a-z0-9]{3,20}$/i;
const fullNameRegex = /^[a-zA-Z\s]+$/;

export const signUpSchema = z.object({
  firstName: z
    .string()
    .regex(fullNameRegex, 'O nome completo deve conter apenas letras e espaços')
    .min(3, 'O nome completo deve ter pelo menos 5 caracteres')
    .transform(stringUtils.formatFirstLetter),
  lastName: z
    .string()
    .regex(fullNameRegex, 'O nome completo deve conter apenas letras e espaços')
    .min(3, 'O nome completo deve ter pelo menos 5 caracteres')
    .transform(stringUtils.formatFirstLetter),
  username: z
    .string()
    .regex(userNameRegex, 'O username deve conter apenas letras e números')
    .min(3, 'O username deve ter pelo menos 3 caracteres')
    .toLowerCase(),

  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter pelo menos 6 caracteres'),
});

export type TSignUpForm = z.infer<typeof signUpSchema>;
