import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
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
  date: { 
    type: Date, 
    required: true 
  },
  location: { 
    type: String, 
    trim: true 
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
eventSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
