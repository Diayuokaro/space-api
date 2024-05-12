import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import getSession from '#controllers/api/v1/auth/sessions/getSession.controllers.js'
import getSessions from '#controllers/api/v1/auth/sessions/getSessions.controllers.js'

const router = Router()

router.route('/:sessionId')
  .get(asyncHandler(getSession))

router.route('/')
  .get(asyncHandler(getSessions))

export default router
