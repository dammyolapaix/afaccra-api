import express from 'express'
import {
  createTopicHandler,
  createTopicMiddleware,
  createTopicValidation,
  getTopicsHandler,
  getSingleTopicByIdHandler,
  singleTopicMiddleware,
  updateTopicByIdHandler,
} from '.'
import { validationMiddleware } from '../../../middlewares'
import { singleClassMiddleware } from '../class.middlewares'

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getTopicsHandler)
  .post(
    validationMiddleware(createTopicValidation),
    singleClassMiddleware,
    createTopicMiddleware,
    createTopicHandler
  )

router
  .route('/:topicId')
  .get(singleTopicMiddleware, getSingleTopicByIdHandler)
  .patch(singleTopicMiddleware, updateTopicByIdHandler)

export default router
