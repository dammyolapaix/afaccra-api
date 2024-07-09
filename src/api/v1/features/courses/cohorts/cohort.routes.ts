import express from 'express'
import { getSingleCourseByQueryMiddleware } from '../course.middlewares'
import { singleCohortMiddleware } from './cohort.middlewares'
import { createCohortHandler, updateCohortHandler } from './cohort.controllers'

const router = express.Router()

router.route('/').post(getSingleCourseByQueryMiddleware, createCohortHandler)
router.route('/:cohortId').patch(singleCohortMiddleware, updateCohortHandler)

export default router
