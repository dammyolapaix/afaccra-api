import express from 'express'
import { courseRoutes } from '../features/courses'
import { authRoutes, authenticatedMiddleware } from '../features/users/auth'
import { classRoutes } from '../features/classes'

const router = express.Router()

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/classes', authenticatedMiddleware, classRoutes)

export default router
