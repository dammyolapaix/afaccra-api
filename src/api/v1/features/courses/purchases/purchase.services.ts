import { eq } from 'drizzle-orm'
import { CoursePurchaseType, NewCoursePurchaseType } from '.'
import { db } from '../../../db'
import coursePurchases from './purchase.schema'

export const purchaseCourse = async (coursePurchase: NewCoursePurchaseType) => {
  const newCoursePurchase = await db
    .insert(coursePurchases)
    .values(coursePurchase)
    .returning()

  return newCoursePurchase[0]
}

export const getSingleCoursePurchaseById = async ({
  id,
}: Pick<CoursePurchaseType, 'id'>) =>
  await db.query.coursePurchases.findFirst({
    where: eq(coursePurchases.id, id),
    with: {
      user: true,
      course: true,
      price: true,
    },
  })

export const updateCoursePurchaseById = async (
  coursePurchaseId: string,
  coursePurchaseToBeUpdated: Partial<NewCoursePurchaseType>
) => {
  const updatedCoursePurchase = await db
    .update(coursePurchases)
    .set(coursePurchaseToBeUpdated)
    .where(eq(coursePurchases.id, coursePurchaseId))
    .returning()

  return updatedCoursePurchase[0]
}
