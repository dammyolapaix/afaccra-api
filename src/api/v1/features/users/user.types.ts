import { Request } from 'express'
import users from './user.schema'

export type UserType = typeof users.$inferSelect
export type NewUserType = typeof users.$inferInsert

export type AuthByEmailRequestType = Request<{}, {}, NewUserType, {}> & {
  token: string
}
