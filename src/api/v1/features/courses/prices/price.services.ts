import { eq } from 'drizzle-orm'
import { CoursePriceQueryType, CoursePriceType, NewCoursePriceType } from '.'
import { db } from '../../../db'
import coursePrices from './price.schema'

export const getCoursePrices = async ({ courseId }: CoursePriceQueryType) =>
  await db.query.coursePrices.findMany({
    where: courseId ? eq(coursePrices.courseId, courseId) : undefined,
    with: { level: true },
  })

export const createCoursePrice = async (coursePrice: NewCoursePriceType) => {
  const newCoursePrice = await db
    .insert(coursePrices)
    .values(coursePrice)
    .returning()
  return newCoursePrice[0]
}

export const getSingleCoursePriceById = async ({
  id,
}: Pick<CoursePriceType, 'id'>) =>
  await db.query.coursePrices.findFirst({ where: eq(coursePrices.id, id) })

export const updateCoursePriceById = async (
  coursePriceId: string,
  coursePriceToBeUpdated: Partial<NewCoursePriceType>
) => {
  const updatedCoursePrice = await db
    .update(coursePrices)
    .set(coursePriceToBeUpdated)
    .where(eq(coursePrices.id, coursePriceId))
    .returning()

  return updatedCoursePrice[0]
}
