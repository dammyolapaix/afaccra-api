import { createInsertSchema } from 'drizzle-zod'
import users from './user.schema'
import { object, z } from 'zod'
import { isPasswordStrong } from './auth'

const insertUserSchema = createInsertSchema(users, {
  email: z
    .string({
      required_error: 'Please provide your email',
    })
    .trim()
    .toLowerCase()
    .email({ message: 'Please provide a valid email' }),
  password: z
    .string({ required_error: 'Please provide your password' })
    .min(8, { message: 'Password must be at least 8 characters or more' })
    .refine((password) => isPasswordStrong(password), {
      message:
        'Your password is weak, please make sure it contains at least a capital and a small letter, a number and a special character',
    }),
})

const body = {
  body: insertUserSchema,
}

export const authByEmailValidation = object({
  ...body,
})
