import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import {
  CoursePriceQueryType,
  CoursePriceRequestType,
  createCoursePrice,
  getCoursePrices,
  updateCoursePriceById,
} from '.'

export const getCoursePricesHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, CoursePriceQueryType>,
    res: Response,
    next: NextFunction
  ) => {
    const prices = await getCoursePrices(req.query)

    res.status(200).json({ success: true, count: prices.length, prices })
  }
)

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
