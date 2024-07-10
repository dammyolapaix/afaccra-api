import { Request } from 'express'
import users from './user.schema'
import { z } from 'zod'
import { insertUserSchema } from '.'
import { UserRolesType } from './roles'

export type UserType = Omit<typeof users.$inferSelect, 'password'> & {
  roles: UserRolesType[]
  password?: string | null
}
export type NewUserType = typeof users.$inferInsert
export type RegisterUserType = z.infer<typeof insertUserSchema> & {
  provider: 'email'
}

export type AuthByEmailRequestType = Request<{}, {}, RegisterUserType, {}> & {
  token: string
  isRegister?: boolean
}
