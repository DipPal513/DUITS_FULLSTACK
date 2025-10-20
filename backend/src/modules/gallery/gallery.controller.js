import Gallery from './gallery.model.js';
import cloudinary from "../../config/cloudinary.js";

// Create a new gallery
export const createGallery = async (req, res, next) => {
  try {
    const { title, description, category, date, image } = req.body;
    
    let imageUrl = "";

    if (image) {
      // Upload Base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "gallery",
      });
      imageUrl = result.secure_url;
    }

    // Save event to MongoDB
    const gallery = await Gallery.create({
      title,
      description,
      category,
      date,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      gallery,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//get gallery
export const getGallery = async (req, res, next) => {
  try {
    const galleries = await Gallery.find().sort({ date: -1 }); // Sort by date descending
    res.json({ success: true, galleries });
  } catch (err) {
    next(err);
  }
}


// Update gallery
export const updateGallery = async (req, res, next) => {
  try {
    const { title, description, date, category } = req.body;
    const image = req.file;
let imageUrl = "";

    if (image) {
      // Upload Base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "gallery",
      });
      imageUrl = result.secure_url;
    }
    const updatedData = { title, description, date, category };
    if (image) updatedData.image = imageUrl;

    const gallery = await Gallery.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery not found' });
    res.json({ success: true, gallery });
  } catch (err) {
    next(err);
  }
};

// Delete gallery
export const deleteGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: 'Gallery not found' });
    res.json({ success: true, message: 'Gallery deleted successfully' });
  } catch (err) {
    next(err);
  }
};


