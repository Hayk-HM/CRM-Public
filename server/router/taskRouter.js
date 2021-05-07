import express from 'express'
import { createTask, getTasks, updateTask } from "../controllers/taskController.js";
import auth from '../middleware/auth.js';

const router = express.Router()

router.get(`/gettasks`, auth, getTasks)
router.post('/createtask', auth, createTask)
router.patch('/updatetask/:id', auth, updateTask)

export default router