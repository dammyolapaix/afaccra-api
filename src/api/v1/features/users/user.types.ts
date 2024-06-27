import { Request } from 'express'
import users from './user.schema'
import { z } from 'zod'
import { insertUserSchema } from '.'

export type UserType = typeof users.$inferSelect
export type NewUserType = typeof users.$inferInsert
export type RegisterUserType = z.infer<typeof insertUserSchema> & {
  provider: 'email'
}

export type AuthByEmailRequestType = Request<{}, {}, RegisterUserType, {}> & {
  token: string
  isRegister?: boolean
}
