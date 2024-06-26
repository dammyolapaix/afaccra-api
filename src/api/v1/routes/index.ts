import express from 'express'
import { courseRoutes } from '../features/courses'
import { authRoutes, authenticatedMiddleware } from '../features/users/auth'
import { classRoutes } from '../features/classes'
import { topicRoutes } from '../features/classes/topics'
import { materialRoutes } from '../features/classes/materials'
import { exerciseRoutes } from '../features/classes/exercises'
import { questionRoutes } from '../features/classes/exercises/questions'
import { optionRoutes } from '../features/classes/exercises/options'

const router = express.Router()

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)
router.use('/api/v1/classes', authenticatedMiddleware, classRoutes)
router.use('/api/v1/topics', authenticatedMiddleware, topicRoutes)
router.use('/api/v1/materials', authenticatedMiddleware, materialRoutes)
router.use('/api/v1/exercises', authenticatedMiddleware, exerciseRoutes)
router.use('/api/v1/questions', authenticatedMiddleware, questionRoutes)
router.use('/api/v1/options', authenticatedMiddleware, optionRoutes)

export default router
