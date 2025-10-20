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




// UPDATE GALLERY
export const updateGallery = async (req, res, next) => {
  try {
    const { title, description, date, category, image } = req.body; // image = base64 string

    // Find existing gallery first
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery not found" });
    }

    let imageUrl = gallery.image; // keep old image if not replaced
    let publicId = gallery.imagePublicId; // store previous public_id if you saved it

    // If new base64 image is sent, replace the old one
    if (image) {
      // Delete old image from Cloudinary (if exists)
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }

      // Upload new image
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "gallery",
      });

      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    // Update fields
    gallery.title = title || gallery.title;
    gallery.description = description || gallery.description;
    gallery.date = date || gallery.date;
    gallery.category = category || gallery.category;
    gallery.image = imageUrl;
    gallery.imagePublicId = publicId;

    const updatedGallery = await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      gallery: updatedGallery,
    });
  } catch (err) {
    console.error(err);
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


