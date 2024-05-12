import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import getPoint from '#controllers/api/v1/points/getPoint.controllers.js'
import modifyPoint from '#controllers/api/v1/points/modifyPoint.controllers.js'
import deletePoint from '#controllers/api/v1/points/deletePoint.controllers.js'
import createPoint from '#controllers/api/v1/points/createPoint.controllers.js'
import getPoints from '#controllers/api/v1/points/getPoints.controllers.js'

const router = Router()

router.route('/:pointId')
  .get(asyncHandler(getPoint))
  .patch(asyncHandler(modifyPoint))
  .delete(asyncHandler(deletePoint))

router.route('/')
  .post(asyncHandler(createPoint))
  .get(asyncHandler(getPoints))

export default router
