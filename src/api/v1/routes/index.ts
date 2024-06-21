import express from 'express'
import { courseRoutes } from '../features/courses'
import { authRoutes } from '../features/users/auth'

const router = express.Router()

router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/courses', courseRoutes)

export default router
