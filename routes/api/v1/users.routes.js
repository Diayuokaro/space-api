import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import getUser from '#controllers/api/v1/users/getUser.controllers.js'
import modifyUser from '#controllers/api/v1/users/modifyUser.controllers.js'
import deleteUser from '#controllers/api/v1/users/deleteUser.controllers.js'
import createUser from '#controllers/api/v1/users/createUser.controllers.js'
import getUsers from '#controllers/api/v1/users/getUsers.controllers.js'

const router = Router()

router.route('/:userId')
  .get(asyncHandler(getUser))
  .patch(asyncHandler(modifyUser))
  .delete(asyncHandler(deleteUser))

router.route('/')
  .post(asyncHandler(createUser))
  .get(asyncHandler(getUsers))

export default router
