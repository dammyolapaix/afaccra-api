import express from 'express'
import { courseRoutes } from '../features/courses'
import { authRoutes, authenticatedMiddleware } from '../features/users/auth'
import { classRoutes } from '../features/classes'
import { topicRoutes } from '../features/classes/topics'

const router = express.Router()

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/classes', authenticatedMiddleware, classRoutes)
router.use('/api/v1/topics', authenticatedMiddleware, topicRoutes)

export default router
