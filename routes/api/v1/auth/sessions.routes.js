import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import getSession from '#controllers/api/v1/auth/sessions/getSession.controllers.js'
import deleteSession from '#controllers/api/v1/auth/sessions/deleteSession.controllers.js'
import getSessions from '#controllers/api/v1/auth/sessions/getSessions.controllers.js'

const router = Router()

router.route('/:sessionId')
  .get(asyncHandler(getSession))
  .delete(asyncHandler(deleteSession))

router.route('/')
  .get(asyncHandler(getSessions))

export default router
