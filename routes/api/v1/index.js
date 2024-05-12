import { Router } from 'express'
import authRoute from './auth/index.js'
import usersRoute from './users.routes.js'
import canvasesRoute from './canvases.routes.js'
import pointsRoute from './points.routes.js'

const router = Router()

router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/canvases', canvasesRoute)
router.use('/points', pointsRoute)

export default router
