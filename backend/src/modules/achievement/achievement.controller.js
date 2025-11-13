import  { createAchievementService,updateAchievementByIdService,deleteAchievementByIdService,getAllAchievementsService } from "./achivement.model.js";
import cloudinary from "../../config/cloudinary.js";
// on creating new achievement image will be uploaded to cloudinary and url will be saved in database
// Create new achievement


const handleResponse = (res, statusCode, success, message, data = {}) => {
  res.status(statusCode).json({
    success,
    message,
    ...data,
  });
};

export const createAchievement = async (req, res, next) => {
  try {
    const { title, description, date, image } = req.body;

    let imageUrl = "";

    if (image) {
      // Upload Base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "achievements",
      });
      imageUrl = result.secure_url;
    }

    // Save achievement to database
    const achievement = await createAchievementService({ title, description, date, image: imageUrl });

    handleResponse(res, 201, true, "Achievement created successfully", { achievement });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

 // Cloudinary setup file

// Create a new achievement
// export const createAchievement = async (req, res, next) => {
//   try {
//     const { title, description, date, image } = req.body;
    
//     let imageUrl = "";

//     if (image) {
//       // Upload Base64 image to Cloudinary
//       const result = await cloudinary.uploader.upload(image, {
//         folder: "achievements",
//       });
//       imageUrl = result.secure_url;
//     }

//     // Save achievement to MongoDB
//     const achievement = await Achievement.create({
//       title,
//       description,
      
//       date,
      
//       image: imageUrl,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Achievement created successfully",
//       achievement,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

//get achievements
// export const getAchievements = async (req, res, next) => {
//   try {
//     const achievements = await Achievement.find().sort({ deadline: -1 }); // Sort by deadline descending
//     res.json({ success: true, achievements });
//   } catch (err) {
//     next(err);
//   }
// }

export const getAchievements = async (req, res, next) => {
  try {
    const achievements = await getAllAchievementsService();
    handleResponse(res, 200, true, "Achievements retrieved successfully", { achievements });
  } catch (err) {
    console.error(err);
    next(err);
  }}
// Updeadline achievement
// export const updateAchievement = async (req, res, next) => {
//   try {
//     const { title, description } = req.body;
//     const image = req.file;
// let imageUrl = "";

//     if (image) {
//       // Upload Base64 image to Cloudinary
//       const result = await cloudinary.uploader.upload(image, {
//         folder: "achievements",
//       });
//       imageUrl = result.secure_url;
//     }
//     const updatedData = { title, description, date };
//     if (image) updatedData.image = imageUrl;

//     const achievement = await Achievement.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
//     res.json({ success: true, achievement });
//   } catch (err) {
//     next(err);
//   }
// };


export const updateAchievement = async (req, res, next) => {
  try {
    const { title, description, date, image } = req.body;
    let imageUrl = image;

    if (image && image.startsWith("data:")) {
      // Upload Base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "achievements",
      });
      imageUrl = result.secure_url;
    }

    const achievement = await updateAchievementByIdService(req.params.id, { title, description, date, image: imageUrl });
    if (!achievement) {
      return handleResponse(res, 404, false, "Achievement not found");
    }

    handleResponse(res, 200, true, "Achievement updated successfully", { achievement });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
// Delete achievement
// export const deleteAchievement = async (req, res, next) => {
//   try {
//     const achievement = await Achievement.findByIdAndDelete(req.params.id);
//     if (!achievement) return res.status(404).json({ success: false, message: 'Achievement not found' });
//     res.json({ success: true, message: 'Achievement deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// };

export const deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await deleteAchievementByIdService(req.params.id);
    if (!achievement) {
      return handleResponse(res, 404, false, "Achievement not found");
    }

    handleResponse(res, 200, true, "Achievement deleted successfully");
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export const singleAchievement = async (req, res, next) => {
  try {
    const achievement = await getSingleAchievementByIdService(req.params.id);
    if (!achievement) {
      return handleResponse(res, 404, false, "Achievement not found");
    }

    handleResponse(res, 200, true, "Achievement retrieved successfully", { achievement });
  } catch (err) {
    console.error(err);
    next(err);
  }
};