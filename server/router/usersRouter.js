import express from 'express'

import { getUsers, updateUser } from '../controllers/usersController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/getusers', auth, getUsers)
router.post('/updateuser/:id', auth, updateUser)

export default router