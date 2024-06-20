import express from 'express'
import { authRoutes } from '../features/users/auth'

const router = express.Router()

router.use('/api/v1/auth', authRoutes)

export default router
