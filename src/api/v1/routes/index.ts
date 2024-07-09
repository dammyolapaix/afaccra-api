import express from 'express'
import { courseRoutes } from '../features/courses'
import {
  authRoutes,
  authenticatedMiddleware,
  staffOnlyOrAboveRouteMiddleware,
} from '../features/users/auth'
import { classRoutes } from '../features/classes'
import { topicRoutes } from '../features/classes/topics'
import { materialRoutes } from '../features/classes/materials'
import { exerciseRoutes } from '../features/classes/exercises'
import { questionRoutes } from '../features/classes/exercises/questions'
import { optionRoutes } from '../features/classes/exercises/options'
import { attachmentRoutes } from '../features/classes/attachments'
import { uploadRoutes } from '../features/uploads'
import { coursePriceRoutes } from '../features/courses/prices'
import { courseScheduleRoutes } from '../features/courses/schedules'
import { cohortRoutes } from '../features/courses/cohorts'
import { levelRoutes } from '../features/levels'

const router = express.Router()

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/levels', authenticatedMiddleware, levelRoutes)
router.use(
  '/api/v1/prices',
  authenticatedMiddleware,
  staffOnlyOrAboveRouteMiddleware,
  coursePriceRoutes
)
router.use(
  '/api/v1/schedules',
  authenticatedMiddleware,
  staffOnlyOrAboveRouteMiddleware,
  courseScheduleRoutes
)
router.use(
  '/api/v1/cohorts',
  authenticatedMiddleware,
  staffOnlyOrAboveRouteMiddleware,
  cohortRoutes
)
router.use('/api/v1/topics', authenticatedMiddleware, topicRoutes)
router.use('/api/v1/materials', authenticatedMiddleware, materialRoutes)
router.use('/api/v1/exercises', authenticatedMiddleware, exerciseRoutes)
router.use('/api/v1/questions', authenticatedMiddleware, questionRoutes)
router.use('/api/v1/options', authenticatedMiddleware, optionRoutes)
router.use('/api/v1/attachments', authenticatedMiddleware, attachmentRoutes)
router.use('/api/v1/uploads', authenticatedMiddleware, uploadRoutes)

export default router
