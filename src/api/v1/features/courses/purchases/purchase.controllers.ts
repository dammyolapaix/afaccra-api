import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import {
  CoursePurchaseRequestType,
  purchaseCourse,
  updateCoursePurchaseById,
} from '.'
import {
  initializePaystackTransaction,
  verifyPaystackTransaction,
} from '../../../utils'

export const purchaseCourseHandler = asyncHandler(
  async (req: CoursePurchaseRequestType, res: Response, next: NextFunction) => {
    const purchase = await purchaseCourse(req.body)

    const transaction = await initializePaystackTransaction({
      amount: req.amount,
      reference: purchase.id,
      email: req.email,
    })

    res.status(201).json({ success: true, transaction, purchase })
  }
)

export const verifyCoursePurchaseHandler = asyncHandler(
  async (
    req: Request<{ purchaseId: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const purchase = await verifyPaystackTransaction({
      reference: req.params.purchaseId,
    })

    res.status(200).json({ success: true, purchase })
  }
)
