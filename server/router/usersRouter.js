import express from 'express'

import { getUsers, updateUser } from '../controllers/usersController.js'
//import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/getusers', getUsers)
router.post('/updateuser/:id', updateUser)

export default router