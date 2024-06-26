import { NextFunction, Request, Response } from 'express'
import {
  NewExerciseType,
  getSingleExerciseById,
  SingleExerciseRequestType,
} from '.'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'
import { getSingleTopicById } from '../topics'

export const createExerciseMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewExerciseType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { topicId } = req.body

    if (topicId) {
      const topic = await getSingleTopicById({ id: topicId })

      if (topic === undefined)
        return next(
          new ErrorResponse(req.t('error.class.topic.not_found'), 404)
        )
    }

    req.body.userId = req.user!.id

    next()
  }
)

export const singleExerciseMiddleware = asyncHandler(
  async (req: SingleExerciseRequestType, res: Response, next: NextFunction) => {
    const { exerciseId: id } = req.params

    const exercise = await getSingleExerciseById({ id })

    if (exercise === undefined)
      return next(
        new ErrorResponse(req.t('error.class.exercise.not_found'), 404)
      )

    req.exercise = exercise

    next()
  }
)
