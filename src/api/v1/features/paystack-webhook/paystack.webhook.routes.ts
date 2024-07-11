import express from 'express'
import { listenToPaystackEventsHandler } from '.'

const router = express.Router()

router.route('/').post(listenToPaystackEventsHandler)

export default router
