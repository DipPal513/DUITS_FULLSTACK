import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
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
  category: { 
    type: String, 
    required: true, 
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
gallerySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
