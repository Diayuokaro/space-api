import { Router } from 'express'
import sessionsRoute from './sessions.routes.js'
import tokenRoute from './token.routes.js'

const router = Router()

router.use('/sessions', sessionsRoute)
router.use('/token', tokenRoute)

export default router
