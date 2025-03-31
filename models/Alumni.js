// File: /models/Alumni.js
import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  photoUrl: {
    type: String,
    default: '/placeholder.jpg',
  },
  role: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  batch: {
    type: String, // graduating year/class
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  industry: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  linkedIn: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Prevent model recompilation error in development
const Alumni = mongoose.models.Alumni || mongoose.model('Alumni', AlumniSchema);

export default Alumni;