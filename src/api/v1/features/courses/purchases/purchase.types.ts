import { Request } from 'express'
import coursePurchases from './purchase.schema'

export type CoursePurchaseType = typeof coursePurchases.$inferSelect
export type NewCoursePurchaseType = typeof coursePurchases.$inferInsert

export type CoursePurchaseRequestType = Request<
  { purchaseId?: string },
  {},
  NewCoursePurchaseType,
  {}
> & {
  amount: string
  email: string
}
