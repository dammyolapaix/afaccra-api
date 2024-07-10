import { db } from '../../db'
import { ClassQueryType, ClassType, NewClassType } from '.'
import classes from './class.schema'
import { eq, getTableColumns } from 'drizzle-orm'
import coursePrices from '../courses/prices/price.schema'
import courses from '../courses/course.schema'
import levels from '../levels/level.schema'

export const getClasses = async (query: ClassQueryType) => {
  if (query.courseId) return await getCourseClasses(query.courseId)

  return await db.query.classes.findMany({
    with: {
      price: { with: { level: true } },
      user: { columns: { password: false } },
    },
  })
}

export const createClass = async (courseClass: NewClassType) => {
  const newClass = await db.insert(classes).values(courseClass).returning()
  return newClass[0]
}

export const getSingleClassById = async ({ id }: Pick<ClassType, 'id'>) =>
  await db.query.classes.findFirst({
    where: eq(classes.id, id),
    with: {
      price: { with: { level: true } },
      user: { columns: { password: false } },
    },
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

export const getCourseClasses = async (courseId: string) =>
  await db
    .select({
      ...getTableColumns(classes),
      price: {
        ...getTableColumns(coursePrices),
      },
      level: {
        ...getTableColumns(levels),
      },
    })
    .from(classes)
    .leftJoin(coursePrices, eq(classes.priceId, coursePrices.id))
    .leftJoin(courses, eq(courses.id, coursePrices.courseId))
    .leftJoin(levels, eq(levels.id, coursePrices.levelId))
    .where(eq(courses.id, courseId))
