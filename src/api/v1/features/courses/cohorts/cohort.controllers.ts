import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import { createCohort, NewCohortType } from '.'

export const createCohortHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewCohortType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const cohort = await createCohort(req.body)

    res.status(201).json({ success: true, cohort })
  }
)
