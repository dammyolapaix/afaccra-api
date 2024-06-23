import { NextFunction, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import {
  CoursePriceRequestType,
  createCoursePrice,
  updateCoursePriceById,
} from '.'

export const createCoursePriceHandler = asyncHandler(
  async (req: CoursePriceRequestType, res: Response, next: NextFunction) => {
    const price = await createCoursePrice(req.body)

    res.status(201).json({ success: true, price })
  }
)

export const updateCoursePriceHandler = asyncHandler(
  async (req: CoursePriceRequestType, res: Response, next: NextFunction) => {
    const price = await updateCoursePriceById(req.params.priceId!, req.body)

    res.status(201).json({ success: true, price })
  }
)
