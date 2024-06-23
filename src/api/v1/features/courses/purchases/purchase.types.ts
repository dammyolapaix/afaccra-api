import { Request } from 'express'
import coursePurchases from './purchase.schema'
import { CoursePriceType } from '../prices'

export type CoursePurchaseType = typeof coursePurchases.$inferSelect & {
  price: CoursePriceType
}
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
