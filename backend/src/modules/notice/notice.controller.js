import Notice from './notice.model.js';
import cloudinary from "../../config/cloudinary.js";
// on creating new notice image will be uploaded to cloudinary and url will be saved in database
// Create new notice



 // Cloudinary setup file

// Create a new notice
export const createNotice = async (req, res, next) => {
  try {
    const { title, description, deadline, registrationLink, image } = req.body;
    
    let imageUrl = "";

    if (image) {
      // Upload Base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "notices",
      });
      imageUrl = result.secure_url;
    }

    // Save notice to MongoDB
    const notice = await Notice.create({
      title,
      description,
      
      deadline,
      registrationLink,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      notice,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//get notices
export const getNotices = async (req, res, next) => {
  try {
    const notices = await Notice.find().sort({ deadline: -1 }); // Sort by deadline descending
    res.json({ success: true, notices });
  } catch (err) {
    next(err);
  }
}


// Updeadline notice
export const updateNotice = async (req, res, next) => {
  try {
    const { title, description, deadline } = req.body;
    const image = req.file;
let imageUrl = "";

    if (image) {
      // Upload Base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "notices",
      });
      imageUrl = result.secure_url;
    }
    const updeadlinedData = { title, description, deadline };
    if (image) updeadlinedData.image = imageUrl;

    const notice = await Notice.findByIdAndUpdate(req.params.id, updeadlinedData, { new: true });
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, notice });
  } catch (err) {
    next(err);
  }
};

// Delete notice
export const deleteNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (err) {
    next(err);
  }
};


export const singleNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.json({ success: true, notice });
  } catch (err) {
    next(err);
  }
};