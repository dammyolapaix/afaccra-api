import { db } from '../../db'
import { CourseQueryType, CourseType, NewCourseType } from '.'
import courses from './course.schema'
import { desc, eq, or } from 'drizzle-orm'
import classes from '../classes/class.schema'
import cohorts from './cohorts/cohort.schema'

export const createCourse = async (course: NewCourseType) => {
  const newCourse = await db.insert(courses).values(course).returning()
  return newCourse[0]
}

export const getSingleCourseByQuery = async ({
  id,
  slugEn,
  slugFr,
}: Partial<Pick<CourseType, 'id' | 'slugEn' | 'slugFr'>>) =>
  await db.query.courses.findFirst({
    where: or(
      slugEn
        ? eq(courses.slugEn, slugEn)
        : slugFr
        ? eq(courses.slugFr, slugFr)
        : id
        ? eq(courses.id, id)
        : undefined
    ),
    with: {
      user: {
        columns: { password: false },
      },
      prices: {
        with: {
          level: true,
        },
      },
      schedules: true,
      cohorts: true,
    },
  })

export const getCourses = async ({
  isPublished,
  prices,
  cohorts: qCohorts,
}: Partial<CourseQueryType>) =>
  await db.query.courses.findMany({
    where:
      isPublished !== undefined
        ? eq(courses.isPublished, isPublished)
        : undefined,
    orderBy: desc(courses.createdAt),
    with: {
      user: {
        columns: { password: false },
      },
      prices: {
        with: {
          level: true,
          classes: {
            where: prices?.classes?.displayOnWebsite
              ? eq(classes.displayOnWebsite, prices.classes.displayOnWebsite)
              : undefined,
          },
        },
      },
      schedules: true,
      cohorts: {
        where: qCohorts?.isActive
          ? eq(cohorts.isActive, qCohorts.isActive)
          : undefined,
      },
    },
  })

export const updateCourseById = async (
  courseId: string,
  courseToBeUpdated: Partial<NewCourseType>
) => {
  const updatedCourse = await db
    .update(courses)
    .set(courseToBeUpdated)
    .where(eq(courses.id, courseId))
    .returning()

  return updatedCourse[0]
}

export const deleteCourseById = async (courseId: string) =>
  await db.delete(courses).where(eq(courses.id, courseId))
