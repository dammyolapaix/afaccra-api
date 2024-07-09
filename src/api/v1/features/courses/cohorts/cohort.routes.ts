import express from 'express'
import { getSingleCourseByQueryMiddleware } from '../course.middlewares'
import { createCohortHandler } from './cohort.controllers'

const router = express.Router()

router.route('/').post(getSingleCourseByQueryMiddleware, createCohortHandler)

export default router
