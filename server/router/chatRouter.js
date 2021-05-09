import express from 'express'
import { createChat, getCompany } from '../controllers/chatController.js';
// import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createmessage', createChat)
router.get(`/getchat`, getCompany)

export default router
