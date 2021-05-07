import express from 'express'
import { createChat, getCompany } from '../controllers/chatController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createmessage', auth, createChat)
router.get(`/getchat`, auth, getCompany)

export default router
