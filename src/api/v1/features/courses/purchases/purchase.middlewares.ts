import { NextFunction, Request } from 'express'
import { asyncHandler } from '../../../middlewares'
import {
  CoursePurchaseRequestType,
  CoursePurchaseType,
  EnrollCourseRequestType,
  getSingleCoursePurchaseById,
  getUserPaidCoursePurchase,
} from '.'
import { ErrorResponse, verifyPaystackTransaction } from '../../../utils'

export const coursePurchaseMiddleware = asyncHandler(
  async (req: CoursePurchaseRequestType, res: Response, next: NextFunction) => {
    const { classId, cohortId } = req.body
    const userId = req.user!.id

    // Checking if class and cohort have the same course
    const classAndCohortHaveSameCourse =
      req.cohort.courseId === req.class.price.courseId

    if (!classAndCohortHaveSameCourse)
      return next(
        new ErrorResponse(req.t("You can't purchase this course now"), 400)
      )

    const userHasPurchasedCourse = await getUserPaidCoursePurchase({
      classId,
      cohortId,
      userId,
    })

    if (userHasPurchasedCourse)
      return next(
        new ErrorResponse(req.t('error.course.enrolled_already'), 400)
      )

    req.body.userId = userId
    req.body.amount = req.class.price.amount

    // For paystack transaction
    req.amount = req.class.price.amount.toString()
    req.email = req.user!.email

    next()
  }
)

export const singleCoursePurchaseMiddleware = asyncHandler(
  async (
    req: Request<{ purchaseId: string }, {}, {}, {}> & {
      purchase?: CoursePurchaseType
    },
    res: Response,
    next: NextFunction
  ) => {
    const { purchaseId: id } = req.params

    const purchase = await getSingleCoursePurchaseById({ id })

    if (purchase === undefined)
      return next(
        new ErrorResponse(req.t('error.course.purchase.not_found'), 404)
      )

    req.purchase = purchase

    next()
  }
)

export const enrollCourseMiddleware = asyncHandler(
  async (req: EnrollCourseRequestType, res: Response, next: NextFunction) => {
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
    if (transaction.data.amount !== req.purchase.amount)
      return next(
        new ErrorResponse(req.t('error.course.purchase.not_verified'), 403)
      )

    req.transaction = transaction

    next()
  }
)
