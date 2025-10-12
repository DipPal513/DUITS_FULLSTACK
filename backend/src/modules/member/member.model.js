import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['ADMIN', 'MEMBER'], default: 'MEMBER' },
  year: { type: String, required: true },               // e.g., 1st year, 2nd year
  subject: { type: String, required: true },           // e.g., CSE, EEE
  motivation: { type: String },                        // Why join the club
  experience: { type: String },                      
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' },
  joinedAt: { type: Date, default: Date.now },
});

const Member = mongoose.model('Member', memberSchema);
export default Member;
