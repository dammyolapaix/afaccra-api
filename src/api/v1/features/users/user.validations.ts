import { object, z } from 'zod'
import { isPasswordStrong } from './auth'

export const insertUserSchema = z.object({
  email: z
    .string({
      required_error: 'error.auth.email_required',
    })
    .trim()
    .toLowerCase()
    .email({ message: 'error.auth.email_invalid' }),
  password: z
    .string({ required_error: 'error.auth.password_required' })
    .min(8, { message: 'error.auth.password_short' })
    .refine((password) => isPasswordStrong(password), {
      message: 'error.auth.password_weak',
    }),
})

const body = {
  body: insertUserSchema,
}

export const authByEmailValidation = object({
  ...body,
})
