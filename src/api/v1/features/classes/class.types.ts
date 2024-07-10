import { Request } from 'express'
import { z } from 'zod'
import classes from './class.schema'
import { CoursePriceType } from '../courses/prices'
import { getClassQuerySchema } from './class.validations'

export type ClassType = typeof classes.$inferSelect & {
  price: CoursePriceType
}
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
