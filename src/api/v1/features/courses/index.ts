import { createCourseValidation } from './course.validations'
import {
  checkDuplicateCourseMiddleware,
  getSingleCourseByQueryMiddleware,
} from './course.middlewares'
import {
  createCourseHandler,
  deleteCourseByIdHandler,
  getCoursesHandler,
  getSingleCourseByQueryHandler,
  updateCourseByIdHandler,
} from './course.controllers'
import courseRoutes from './course.routes'
import {
  createCourse,
  deleteCourseById,
  getCourses,
  getSingleCourseByQuery,
  updateCourseById,
} from './course.services'
import {
  CourseType,
  NewCourseType,
  SingleCourseByQueryRequestType,
} from './course.types'

export { createCourseValidation }
export { checkDuplicateCourseMiddleware, getSingleCourseByQueryMiddleware }
export { CourseType, NewCourseType, SingleCourseByQueryRequestType }
export {
  createCourse,
  deleteCourseById,
  getCourses,
  getSingleCourseByQuery,
  updateCourseById,
}
export {
  createCourseHandler,
  deleteCourseByIdHandler,
  getCoursesHandler,
  getSingleCourseByQueryHandler,
  updateCourseByIdHandler,
}
export { courseRoutes }
