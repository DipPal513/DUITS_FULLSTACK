// import Notice from './notice.model.js';
import { getNoticeByIdService ,getNoticesService, deleteNoticeService, updateNoticeService, createNoticeService } from "./notice.model.js";
import cloudinary from "../../config/cloudinary.js";
// on creating new notice image will be uploaded to cloudinary and url will be saved in database
// Create new notice


export const createNotice = async (req, res, next) => {
  try {
    const { title, description, registrationLink, image, deadline } = req.body;
    let imageUrl = "";

    if (image) {
      // Upload Base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "notices",
      });
      imageUrl = result.secure_url;
    }

    const newNoticeData = {
      title,
      description,
      registrationLink,
      image: imageUrl,
      deadline,
    };

    const newNotice = await createNoticeService(newNoticeData);
    res.status(201).json({ success: true, data: newNotice });
  } catch (err) {
    next(err);
  }
};

export const getNotices = async (req, res, next) => {
  try {
   
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
    const finalLimit = Math.min(limit, 50); 
    const notices = await getNoticesService(finalLimit, page);
    res.status(200).json({ success: true, data: notices });
  } catch (err) {
    next(err);
  }
};

export const singleNotice = async (req, res, next) => {
  try {
    const notice = await getNoticeByIdService(req.params.id);
    if (notice.length === 0) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }
    res.status(200).json({ success: true, data: notice });
   
  } catch (err) {
    next(err);
  }
};


export const updateNotice = async (req, res, next) => {
  try {
    const { title, description, registrationLink, image, deadline } = req.body;
    let imageUrl = "";

    if (image) {
     
      const result = await cloudinary.uploader.upload(image, {
        folder: "notices",
      });
      imageUrl = result.secure_url;
    }

    const updatedNoticeData = {
      title,
      description,
      registrationLink,
      image: imageUrl,
      deadline,
    };

    const updatedNotice = await updateNoticeService(req.params.id, updatedNoticeData);
    res.status(200).json({ success: true, data: updatedNotice });
  } catch (err) {
    next(err);
  }
};


export const deleteNotice = async (req, res, next) => {

  console.log("Delete request for notice ID:", req.params.id);
  try {
    const result = await deleteNoticeService(req.params.id);
    
    res.status(200).json({ success: true, message: 'Notice deleted successfully' });
  } catch (err) {
    next(err);
  }
};
