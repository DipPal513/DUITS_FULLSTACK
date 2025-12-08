import { createExecutiveService, getExecutivesService, getExecutiveByIdService, deleteExecutiveService, updateExecutiveService } from './executive.model.js';
import cloudinary from '../../config/cloudinary.js';
export const getExecutives = async (req, res, next) => {
  try {
    const { year, batch } = req.query;
    
    // Build filters object
    const filters = {};
    
    if (year) {
      filters.year = parseInt(year);
    }
    
    if (batch) {
      filters.batch = batch;
    }
    
    const executives = await getExecutivesService(filters);
    
    res.status(200).json({ 
      success: true, 
      data: executives 
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};



export const getExecutiveById = async (req, res, next) => {
  try {
    const executive = await getExecutiveByIdService(req.params.id);
    console.log(executive)
    if (!executive) {
      return res.status(404).json({ success: false, message: 'Executives not found' });
    }
    res.status(200).json({ success: true, data: executive });
  } catch (err) {
    next(err);
  }
};

export const createExecutive = async (req, res, next) => {
  try {
     // Upload Base64 image to Cloudinary
    let imageUrl = "";
    const{image, ...rest} = req.body;
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "executives",
      });
      imageUrl = result.secure_url;
    }

    const executiveData = {
      ...rest,
      image: imageUrl,
    };

    const result = await createExecutiveService(executiveData);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};    

export const deleteExecutive = async (req, res, next) => {
  try {
    const result = await deleteExecutiveService(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Executive not found' });
    }
    res.status(200).json({ success: true, message: 'Executive deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const updateExecutive = async (req, res, next) => {
  console.log("its painful",req.params.id, req.body);
  try {
    const result = await updateExecutiveService(req.params.id, req.body);
    console.log("request paramsZ: ", req.params);
   
    res.status(200).json({ success: true, message: 'Executive updated successfully' });
  } catch (err) {
    next(err);
  }
};