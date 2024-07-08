import express from 'express'
import { getLevelsHandler } from '.'

const router = express.Router()

router.route('/').get(getLevelsHandler)

export default router
