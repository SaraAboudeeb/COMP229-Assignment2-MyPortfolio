import mongoose from 'mongoose'

const QualificationSchema = new mongoose.Schema({
  title: { type: String, trim: true, required: 'Title is required' },
  firstName: { type: String, trim: true, required: 'First name is required' },
  lastName: { type: String, trim: true, required: 'Last name is required' },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  completion: { type: Date, required: 'Completion date is required' },
  description: { type: String, trim: true, required: 'Description is required' }
}, { timestamps: true })

export default mongoose.model('Qualification', QualificationSchema)