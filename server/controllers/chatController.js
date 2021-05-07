import ChatSchema from '../models/dbmessages.js'

export const createChat = async (req, res) => {
  const dbMessage = req.body
  //console.log('LogFromCreateChat', req.body);
  try {
    const newMessage = await ChatSchema.create(dbMessage)
    res.status(201).json(newMessage)

  } catch (error) {
    res.status(500).json(error)
  }
}

export const getCompany = async (req, res) => {
  try {
    const chat = await ChatSchema.find({ room: req.query.company })
    res.status(200).json(chat)
  } catch (error) {
    res.status(404).json({ message: `Can't find chat` })
  }
}