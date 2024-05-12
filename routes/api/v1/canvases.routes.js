import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import getCanvas from '#controllers/api/v1/canvases/getCanvas.controllers.js'
import modifyCanvas from '#controllers/api/v1/canvases/modifyCanvas.controllers.js'
import deleteCanvas from '#controllers/api/v1/canvases/deleteCanvas.controllers.js'
import createCanvas from '#controllers/api/v1/canvases/createCanvas.controllers.js'
import getCanvases from '#controllers/api/v1/canvases/getCanvases.controllers.js'

const router = Router()

router.route('/:canvasId')
  .get(asyncHandler(getCanvas))
  .patch(asyncHandler(modifyCanvas))
  .delete(asyncHandler(deleteCanvas))

router.route('/')
  .post(asyncHandler(createCanvas))
  .get(asyncHandler(getCanvases))

export default router
