import { db } from '../../db'
import { CourseType, NewCourseType } from '.'
import courses from './course.schema'
import { eq, or } from 'drizzle-orm'

export const createCourse = async (course: NewCourseType) => {
  const newCourse = await db.insert(courses).values(course).returning()
  return newCourse[0]
}

export const getSingleCourseByQuery = async ({
  id,
  slugEn,
  slugFr,
  identifier,
}: Partial<
  Pick<CourseType, 'id' | 'slugEn' | 'slugFr'> & { identifier: string }
>) =>
  await db.query.courses.findFirst({
    where: or(
      slugEn
        ? eq(courses.slugEn, slugEn)
        : slugFr
        ? eq(courses.slugFr, slugFr)
        : id
        ? eq(courses.id, id)
        : undefined,
      identifier
        ? or(
            eq(courses.titleEn, identifier),
            eq(courses.titleFr, identifier),
            eq(courses.slugEn, identifier),
            eq(courses.slugFr, identifier)
          )
        : undefined
    ),
    with: {
      user: true,
      coursePrices: true,
      courseSchedules: true,
    },
  })

export const getCourses = async () =>
  await db.query.courses.findMany({
    with: {
      user: true,
      coursePrices: true,
      courseSchedules: true,
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
