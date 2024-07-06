import { db } from '../../db'
import { ClassType, NewClassType } from '.'
import classes from './class.schema'
import { eq } from 'drizzle-orm'

export const getClasses = async () =>
  await db.query.classes.findMany({
    with: { price: true, user: { columns: { password: false } } },
  })

export const createClass = async (courseClass: NewClassType) => {
  const newClass = await db.insert(classes).values(courseClass).returning()
  return newClass[0]
}

export const getSingleClassById = async ({ id }: Pick<ClassType, 'id'>) =>
  await db.query.classes.findFirst({
    where: eq(classes.id, id),
    with: { price: true, user: { columns: { password: false } } },
  })

export const updateClassById = async (
  classId: string,
  classToBeUpdated: Partial<ClassType>
) => {
  const updatedClass = await db
    .update(classes)
    .set(classToBeUpdated)
    .where(eq(classes.id, classId))
    .returning()

  return updatedClass[0]
}
