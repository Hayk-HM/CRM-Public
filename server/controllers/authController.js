import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserModel from "../models/user.js";

export const signup = async (req, res) => {
  const { firstName, lastName, email, company, password, confirmPassword } = req.body
  try {
    if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })
    const existedUser = await UserModel.findOne({ email })
    if (existedUser) return res.status(400).json({ message: "User already exists" });
    const existCompany = await UserModel.findOne({ company })
    if (existCompany) return res.status(400).json({ message: "Company already exists" });
    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await UserModel.create({ firstName, lastName, fullName: `${firstName} ${lastName}`, email, company, companyId: `${company.split(' ').join('').toLowerCase()}`, password: hashedPassword, isAdmin: true })
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })
    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json('Something went wrong', error)
  }
}

export const signupEmployee = async (req, res) => {
  const { firstName, lastName, email, company, password, confirmPassword } = req.body
  try {
    if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" })
    const existedUser = await UserModel.findOne({ email })
    if (existedUser) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12)
    const result = await UserModel.create({ firstName, lastName, fullName: `${firstName} ${lastName}`, email, company, companyId: `${company.split(' ').join('').toLowerCase()}`, password: hashedPassword })
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })
    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json('Something went wrong', error)
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" })
    res.status(200).json({ result: user, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}