import UserModel from "../models/user.js";
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'


export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ company: req.query.company })
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: "Can not find users, please try later" })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { firstName, lastName } = req.body
  const updateInfo = { firstName, lastName, fullName: `${firstName} ${lastName}` }
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json(`No user with id: ${id}`);
    const result = await UserModel.findByIdAndUpdate(id, updateInfo, { new: true })
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })
    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json(error)
  }
}