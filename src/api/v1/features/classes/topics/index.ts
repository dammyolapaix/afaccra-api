import {
  createTopicMiddleware,
  singleTopicMiddleware,
} from './topic.middlewares'
import { createTopicValidation } from './topic.validations'
import { NewTopicType, SingleTopicRequestType, TopicType } from './topic.types'
import {
  createTopic,
  getSingleTopicById,
  getTopics,
  updateTopicById,
} from './topic.services'
import {
  createTopicHandler,
  getTopicsHandler,
  getSingleTopicByIdHandler,
  updateTopicByIdHandler,
} from './topic.controllers'
import topicRoutes from './topic.routes'

export { createTopicMiddleware, singleTopicMiddleware }
export { createTopicValidation }
export { NewTopicType, SingleTopicRequestType, TopicType }
export { createTopic, getSingleTopicById, getTopics, updateTopicById }
export {
  createTopicHandler,
  getTopicsHandler,
  getSingleTopicByIdHandler,
  updateTopicByIdHandler,
}
export { topicRoutes }
