import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  registrationLink: { 
    type: String, 
    trim: true 
  },
  image: { 
    type: String, 
    trim: true 
  },
  deadline: { 
    type: Date, 
    required: true 
  },
  
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Auto-update `updatedAt` before saving
noticeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
