import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import revokeToken from '#controllers/api/v1/auth/token/revokeToken.controllers.js'
import createToken from '#controllers/api/v1/auth/token/createToken.controllers.js'

const router = Router()

router.route('/revoke')
  .post(asyncHandler(revokeToken))

router.route('/')
  .post(asyncHandler(createToken))

export default router
