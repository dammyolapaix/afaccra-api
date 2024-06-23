import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import { NewCourseEnrollmentType } from '.'
import { ErrorResponse, verifyPaystackTransaction } from '../../../utils'
import { CoursePurchaseType, updateCoursePurchaseById } from '../purchases'

export const enrollCourseMiddleware = asyncHandler(
  async (
    req: Request<{ purchaseId: string }, {}, NewCourseEnrollmentType, {}> & {
      purchase: CoursePurchaseType
    },
    res: Response,
    next: NextFunction
  ) => {
    if (req.purchase.paymentStatus === 'paid')
      return next(
        new ErrorResponse(req.t('error.course.enrolled_already'), 400)
      )

    const { purchaseId: reference } = req.params
    const transaction = await verifyPaystackTransaction({ reference })

    if (
      transaction.data.status !== 'success' ||
      transaction.data.paid_at === null
    )
      return next(
        new ErrorResponse(req.t('error.course.purchase.not_verified'), 403)
      )

    // Extra check, verify the amount paid
    if (transaction.data.amount !== req.purchase.price.amount)
      return next(
        new ErrorResponse(req.t('error.course.purchase.not_verified'), 403)
      )

    const confirmCoursePurchase = await updateCoursePurchaseById(reference, {
      paidAt: transaction.data.paid_at,
      paymentStatus: 'paid',
      paystackTransactionId: transaction.data.id,
    })

    if (!confirmCoursePurchase || confirmCoursePurchase === undefined)
      return next(new ErrorResponse(req.t('error.something_went_wrong'), 500))

    req.body.userId = req.user!.id
    req.body.courseId = req.purchase.courseId
    req.body.coursePurchaseId = reference
    req.body.enrolledAt = new Date().toISOString()

    next()
  }
)
