import mongoose from "mongoose";
import errorHandler from "../../middleware/errorHandler.js";
import Executive from "./executive.model.js";
import cloudinary from "../../config/cloudinary.js";

// Get all executives
const getExecutives = async (req, res, next) => {
  try {
    const executives = await Executive.find();
    res.status(200).json({ success: true, data: executives });
  } catch (err) {
    next(err);
  }
};

// Get executive by ID
const getExecutiveById = async (req, res, next) => {
  try {
    const executive = await Executive.findById(req.params.id);
    if (!executive) {
      return res.status(404).json({ success: false, message: 'Executive not found' });
    }
    res.status(200).json({ success: true, data: executive });
  } catch (err) {
    next(err);
  }
};

// Create a new executive
const createExecutive = async (req, res, next) => {
  try {
    const { name, position, department, session, email, phone,image } = req.body;
    const newExecutive = new Executive({
      name,
      session,
      position,
      department,
      email,
      phone,image
    });
    // error validation for unique email
    const existingExecutive = await Executive.findOne({ email });
    if (existingExecutive) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    let imageUrl = "";
  
      if (image) {
        // Upload Base64 image to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
          folder: "executives",
        });
        imageUrl = result.secure_url;
      }
  
    newExecutive.image = imageUrl;

    const savedExecutive = await newExecutive.save();
    res.status(201).json({ success: true, data: savedExecutive });
  } catch (err) {
    
    next(err);
  }
};

// Update an existing executive
const updateExecutive = async (req, res, next) => {
  try {
    const updatedExecutive = await Executive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExecutive) {
      return res.status(404).json({ success: false, message: 'Executive not found' });
    }     res.status(200).json({ success: true, data: updatedExecutive });
  } catch (err) {
    next(err);
  }
};

// Delete an executive
const deleteExecutive = async (req, res, next) => {
  try {
    const deletedExecutive = await Executive.findByIdAndDelete(req.params.id);
    if (!deletedExecutive) {
      return res.status(404).json({ success: false, message: 'Executive not found' });
    }
    res.status(200).json({ success: true, message: 'Executive deleted successfully' });
  } catch (err) {
    next(err);
  }
};  
export { getExecutives, getExecutiveById, createExecutive, updateExecutive, deleteExecutive };