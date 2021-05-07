import express from 'express'

import { signin, signup, signupEmployee } from '../controllers/authController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/signupEmployee', auth, signupEmployee)
router.post('/signin', signin)

export default router
