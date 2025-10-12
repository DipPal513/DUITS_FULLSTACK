import express from 'express';
import {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from './event.controller.js';

import parser from '../../config/multer.js'; // Multer Cloudinary

const router = express.Router();

// Upload image while creating event
router.post('/', parser.single('image'), createEvent);

// CRUD routes
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', parser.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
