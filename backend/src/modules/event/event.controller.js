// import Event from './event.model.js';
// import cloudinary from "../../config/cloudinary.js";
// // on creating new event image will be uploaded to cloudinary and url will be saved in database
// // Create new event



//  // Cloudinary setup file

// // Create a new event
// export const createEvent = async (req, res, next) => {
//   try {
//     const { title, description, location, date, registrationLink, image } = req.body;
    
//     let imageUrl = "";

//     if (image) {
//       // Upload Base64 image to Cloudinary
//       const result = await cloudinary.uploader.upload(image, {
//         folder: "events",
//       });
//       imageUrl = result.secure_url;
//     }

//     // Save event to MongoDB
//     const event = await Event.create({
//       title,
//       description,
//       location,
//       date,
//       registrationLink,
//       image: imageUrl,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Event created successfully",
//       event,
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

// //get events
// export const getEvents = async (req, res, next) => {
//   try {
//     const events = await Event.find().sort({ date: -1 }); // Sort by date descending
//     res.json({ success: true, events });
//   } catch (err) {
//     next(err);
//   }
// }


// // Update event
// export const updateEvent = async (req, res, next) => {
//   try {
//     const { title, description, date, location } = req.body;
//     const image = req.file;
// let imageUrl = "";

//     if (image) {
//       // Upload Base64 image to Cloudinary
//       const result = await cloudinary.uploader.upload(image, {
//         folder: "events",
//       });
//       imageUrl = result.secure_url;
//     }
//     const updatedData = { title, description, date, location };
//     if (image) updatedData.image = imageUrl;

//     const event = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
//     if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
//     res.json({ success: true, event });
//   } catch (err) {
//     next(err);
//   }
// };

// // Delete event
// export const deleteEvent = async (req, res, next) => {
//   try {
//     const event = await Event.findByIdAndDelete(req.params.id);
//     if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
//     res.json({ success: true, message: 'Event deleted successfully' });
//   } catch (err) {
//     next(err);
//   }
// };


import { createEventService,
  getEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService
} from './event.model.js';

// Create new event
export const createEvent = async (req, res, next) => {
  try {
    const event = await createEventService(req.body);
    res.status(201).json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

// Get all events
export const getEvents = async (req, res, next) => {
  try {
    const events = await getEventsService();
    res.status(200).json({ success: true, events });
  } catch (err) {
    next(err);
  }
};  

// Get event by ID
export const getEventById = async (req, res, next) => {
  try {
    const event = await getEventByIdService(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

// Update event
export const updateEvent = async (req, res, next) => {
  try {
    const event = await updateEventService(req.params.id, req.body);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

// Delete event
export const deleteEvent = async (req, res, next) => {
  try {
    const event = await deleteEventService(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    next(err);
  }
};  