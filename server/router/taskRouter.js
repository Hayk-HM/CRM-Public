import express from 'express'
import { createTask, getTasks, updateTask } from "../controllers/taskController.js";
// import auth from '../middleware/auth.js';

const router = express.Router()

router.get(`/gettasks`, getTasks)
router.post('/createtask', createTask)
router.patch('/updatetask/:id', updateTask)

export default router