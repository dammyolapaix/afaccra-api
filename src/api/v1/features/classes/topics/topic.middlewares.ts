import { NextFunction, Request, Response } from 'express'
import { NewTopicType, getSingleTopicById, SingleTopicRequestType } from '.'
import { asyncHandler } from '../../../middlewares'
import { ErrorResponse } from '../../../utils'

export const createTopicMiddleware = asyncHandler(
  async (
    req: Request<{}, {}, NewTopicType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    req.body.userId = req.user!.id

    next()
  }
)

export const singleTopicMiddleware = asyncHandler(
  async (req: SingleTopicRequestType, res: Response, next: NextFunction) => {
    const { topicId: id } = req.params

    const topic = await getSingleTopicById({ id })

    if (topic === undefined)
      return next(new ErrorResponse(req.t('error.class.topic.not_found'), 404))

    req.topic = topic

    next()
  }
)
