import mongoose from 'mongoose';

const ExecutiveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Executive = mongoose.model('Executive', ExecutiveSchema);

export default Executive;