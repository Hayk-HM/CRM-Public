import mongoose from 'mongoose'

const ChatSchema = mongoose.Schema({
  message: String,
  user: Object,
  room: String,
})

export default mongoose.model('messageContent', ChatSchema)