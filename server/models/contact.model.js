import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: 'First name is required' },
  lastName: { type: String, trim: true, required: 'Last name is required' },
  email: {
    type: String, trim: true, lowercase: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  phone: { type: String, trim: true, required: 'Phone is required' },
  message: { type: String, trim: true, required: 'Message is required' }
}, { timestamps: true })

export default mongoose.model('Contact', ContactSchema)