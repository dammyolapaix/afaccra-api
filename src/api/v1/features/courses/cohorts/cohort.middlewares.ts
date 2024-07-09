import { NextFunction, Response } from 'express'
import { asyncHandler } from '../../../middlewares'
import { getSingleCohortById, SingleCohortRequestType } from '.'
import { ErrorResponse } from '../../../utils'

export const singleCohortMiddleware = asyncHandler(
  async (req: SingleCohortRequestType, res: Response, next: NextFunction) => {
    let cohortId: string | undefined = undefined

    if (req.params.cohortId) cohortId = req.params.cohortId
    if (req.body.cohortId) cohortId = req.body.cohortId

    if (cohortId === undefined)
      return next(
        new ErrorResponse(req.t('error.course.cohort.cohortId.required'), 400)
      )

    const cohort = await getSingleCohortById({ id: cohortId })

    if (cohort === undefined)
      return next(
        new ErrorResponse(req.t('error.course.cohort.not_found'), 404)
      )

    req.cohort = cohort

    next()
  }
)
