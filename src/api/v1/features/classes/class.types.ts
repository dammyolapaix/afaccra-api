import { Request } from 'express'
import { z } from 'zod'
import classes from './class.schema'
import { getClassQuerySchema } from './class.validations'

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

export type ClassQueryType = z.infer<typeof getClassQuerySchema>
