import { TopicType, NewTopicType } from '.'
import { db } from '../../../db'
import classTopics from './topic.schema'
import { eq } from 'drizzle-orm'

export const getTopics = async () =>
  await db.query.classTopics.findMany({
    with: { class: true, user: { columns: { password: false } } },
  })

export const createTopic = async (topic: NewTopicType) => {
  const newTopic = await db.insert(classTopics).values(topic).returning()
  return newTopic[0]
}

export const getSingleTopicById = async ({ id }: Pick<TopicType, 'id'>) =>
  await db.query.classTopics.findFirst({
    where: eq(classTopics.id, id),
    with: { class: true, user: { columns: { password: false } } },
  })

export const updateTopicById = async (
  topicId: string,
  topicToBeUpdated: Partial<TopicType>
) => {
  const updatedTopic = await db
    .update(classTopics)
    .set(topicToBeUpdated)
    .where(eq(classTopics.id, topicId))
    .returning()

  return updatedTopic[0]
}
