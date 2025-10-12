import Event from './event.model.js';

// Create new event
export const createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location } = req.body;
    const image = req.file?.path; // Cloudinary URL

    const event = await Event.create({ title, description, date, location, image });
    res.status(201).json({ success: true, event });
  } catch (err) {
    next(err);
  }
};

// Update event
export const updateEvent = async (req, res, next) => {
  try {
    const { title, description, date, location } = req.body;
    const image = req.file?.path;

    const updatedData = { title, description, date, location };
    if (image) updatedData.image = image;

    const event = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event });
  } catch (err) {
    next(err);
  }
};
