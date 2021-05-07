import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema({
  title: String,
  description: String,
  urgency: String,
  createdAt: {
    type: Date,
    default: Date()
  },
  status: {
    type: String,
    default: 'Not in progress'
  },
  creatorName: String,
  creatorId: String,
  creatorPhoto: String,
  company: String,
  companyId: String,
  comment: String,
  createdFor: String,
  createdForId: String,
  comment: String,
})

const TaskModel = mongoose.model('Task', TaskSchema)

export default TaskModel