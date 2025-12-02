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
     const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
      const finalLimit = Math.min(limit, 50); 
      const events = await getEventsService(finalLimit, page);
      res.status(200).json({ success: true, data: events });} catch (err) {
      console.error(err);
      next(err);
    }
};  

// Get event by ID
export const getEventById = async (req, res, next) => {
  try {
    const event = await getEventByIdService(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.status(200).json({ success: true, data:event });
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