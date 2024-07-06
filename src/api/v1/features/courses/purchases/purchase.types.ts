import { Request } from 'express'
import coursePurchases from './purchase.schema'
import { VerifyPaystackTransactionSuccessResType } from '../../../types'

export type CoursePurchaseType = typeof coursePurchases.$inferSelect
export type NewCoursePurchaseType = typeof coursePurchases.$inferInsert

export type CoursePurchaseRequestType = Request<
  { purchaseId?: string },
  {},
  NewCoursePurchaseType,
  {}
> & {
  // For paystack transaction
  amount: string
  email: string
}

export type EnrollCourseRequestType = Request<
  { purchaseId: string },
  {},
  {},
  {}
> & {
  purchase: CoursePurchaseType
  transaction?: VerifyPaystackTransactionSuccessResType
}
