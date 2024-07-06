import { and, eq } from 'drizzle-orm'
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
  })

export const getUserPaidCoursePurchase = async ({
  classId,
  cohortId,
  userId,
}: Pick<CoursePurchaseType, 'classId' | 'cohortId' | 'userId'>) =>
  await db.query.coursePurchases.findFirst({
    where: and(
      eq(coursePurchases.classId, classId),
      eq(coursePurchases.cohortId, cohortId),
      eq(coursePurchases.userId, userId),
      eq(coursePurchases.paymentStatus, 'paid')
    ),
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
