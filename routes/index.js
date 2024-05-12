import { Router } from 'express'
import apiRoute from './api/index.js'

const router = Router()

router.use('/api', apiRoute)

export default router
