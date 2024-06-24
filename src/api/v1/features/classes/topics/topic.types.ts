import { Request } from 'express'
import topics from './topic.schema'

export type TopicType = typeof topics.$inferSelect
export type NewTopicType = typeof topics.$inferInsert

export type SingleTopicRequestType = Request<
  { topicId: TopicType['id'] },
  {},
  {},
  {}
> & {
  topic?: TopicType
}
