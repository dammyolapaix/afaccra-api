import { Request } from 'express'
import coursePurchases from './purchase.schema'
import { VerifyPaystackTransactionSuccessResType } from '../../../types'
import { ClassType } from '../../classes'
import { CohortType } from '../cohorts'

export type CoursePurchaseType = typeof coursePurchases.$inferSelect
export type NewCoursePurchaseType = typeof coursePurchases.$inferInsert

export type CoursePurchaseRequestType = Request<
  { purchaseId?: string },
  {},
  NewCoursePurchaseType,
  {}
> & {
  class: ClassType
  cohort: CohortType

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
