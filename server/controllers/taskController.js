import TaskModel from "../models/task.js";
import mongoose from 'mongoose';
import sendEmail from "../email/email.js";

export const createTask = async (req, res) => {
  const { taskTitle, taskDescription, urgency, creatorId, creatorName, company, createdFor, email } = req.body
  console.log('BODY---------------', req.body);
  try {
    const task = await TaskModel.create({ title: taskTitle, description: taskDescription, urgency, creatorId, creatorName, company, companyId: `${company.split(' ').join('').toLowerCase()}`, createdFor })
    res.status(201).json(task)
    console.log("TASK------------", task);
    sendEmail(email)
  } catch (error) {
    res.status(400).json({ message: "Can't create new task" })
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({ company: req.query.company })
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({ message: `Can't find tasks` })
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const { status, comment } = req.body
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const value = { status, comment }
    const updatedTask = await TaskModel.findByIdAndUpdate(id, value, { new: true })
    console.log(updatedTask);
    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(404).json({ message: `Can't update task///${error}` })
  }
}