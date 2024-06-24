import { NextFunction, Request, Response } from 'express'
import {
  TopicType,
  NewTopicType,
  SingleTopicRequestType,
  createTopic,
  getTopics,
  updateTopicById,
} from '.'
import { asyncHandler } from '../../../middlewares'

export const getTopicsHandler = asyncHandler(
  async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const topics = await getTopics()

    res.status(200).json({ success: true, count: topics.length, topics })
  }
)

export const createTopicHandler = asyncHandler(
  async (
    req: Request<{}, {}, NewTopicType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const topic = await createTopic(req.body)

    res.status(200).json({ success: true, topic })
  }
)

export const getSingleTopicByIdHandler = asyncHandler(
  async (req: SingleTopicRequestType, res: Response, next: NextFunction) =>
    res.status(200).json({ success: true, topic: req.topic! })
)

export const updateTopicByIdHandler = asyncHandler(
  async (
    req: Request<{ topicId: TopicType['id'] }, {}, NewTopicType, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const updatedTopic = await updateTopicById(req.params.topicId, req.body)

    res.status(200).json({ success: true, topic: updatedTopic })
  }
)
