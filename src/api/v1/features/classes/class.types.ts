import { Request } from 'express'
import classes from './class.schema'

export type ClassType = typeof classes.$inferSelect
export type NewClassType = typeof classes.$inferInsert

export type SingleClassRequestType = Request<
  { classId: ClassType['id'] },
  {},
  {},
  {}
> & {
  class?: ClassType
}
