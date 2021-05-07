import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  email: String,
  password: String,
  company: String,
  companyId: String,
  country: String,
  city: String,
  occupation: String,
  phoneNumber: String,
  photo: String,
  createdAt: {
    type: Date,
    default: Date()
  },
  updatedAt: {
    type: Date,
    default: Date()
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  department: String
})

const UserModel = mongoose.model('User', UserSchema)

export default UserModel
