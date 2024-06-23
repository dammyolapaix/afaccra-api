import { NewCourseEnrollmentType } from '.'
import { db } from '../../../db'
import courseEnrollments from './enrollment.schema'

export const enrollCourse = async (enrollment: NewCourseEnrollmentType) => {
  const newEnrollment = await db
    .insert(courseEnrollments)
    .values(enrollment)
    .returning()

  return newEnrollment[0]
}
