import { eq } from 'drizzle-orm'
import { CourseScheduleType, NewCourseScheduleType } from '.'
import { db } from '../../../db'
import courseSchedules from './schedule.schema'

export const createCourseSchedule = async (
  courseSchedule: NewCourseScheduleType
) => {
  const newCourseSchedule = await db
    .insert(courseSchedules)
    .values(courseSchedule)
    .returning()
  return newCourseSchedule[0]
}

export const getSingleCourseScheduleById = async ({
  id,
}: Pick<CourseScheduleType, 'id'>) =>
  await db.query.courseSchedules.findFirst({
    where: eq(courseSchedules.id, id),
  })

export const updateCourseScheduleById = async (
  courseScheduleId: string,
  courseScheduleToBeUpdated: Partial<NewCourseScheduleType>
) => {
  const updatedCourseSchedule = await db
    .update(courseSchedules)
    .set(courseScheduleToBeUpdated)
    .where(eq(courseSchedules.id, courseScheduleId))
    .returning()

  return updatedCourseSchedule[0]
}
