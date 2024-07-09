import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import {
  CohortRequestType,
  createCohort,
  NewCohortType,
  SingleCohortRequestType,
  updateCohortById,
} from '.'

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

export const updateCohortHandler = asyncHandler(
  async (req: CohortRequestType, res: Response, next: NextFunction) => {
    const cohort = await updateCohortById(req.params.cohortId!, req.body)

    res.status(201).json({ success: true, cohort })
  }
)
