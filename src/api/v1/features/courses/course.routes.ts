import express from 'express'
import {
  createCourseHandler,
  getCoursesHandler,
  getSingleCourseByQueryHandler,
  getSingleCourseByQueryMiddleware,
  updateCourseByIdHandler,
} from '.'
import { checkDuplicateCourseMiddleware } from '.'

const router = express.Router()

router
  .route('/')
  .get(getCoursesHandler)
  .post(checkDuplicateCourseMiddleware, createCourseHandler)

router
  .route('/:identifier')
  .get(getSingleCourseByQueryMiddleware, getSingleCourseByQueryHandler)
  .patch(
    getSingleCourseByQueryMiddleware,
    checkDuplicateCourseMiddleware,
    updateCourseByIdHandler
  )

export default router
