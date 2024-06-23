import { eq } from 'drizzle-orm'
import { CoursePriceType, NewCoursePriceType } from '.'
import { db } from '../../../db'
import coursePrices from './price.schema'

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
