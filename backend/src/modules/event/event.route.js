import express from 'express';
import {
  createEvent,
  deleteEvent,
  getEvents,updateEvent
} from './event.controller.js';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import isAdmin from '../../middleware/isAdmin.js';

const router = express.Router();

// Upload image while creating event
router.post('/',isAuthenticated, createEvent);
router.get('/', getEvents);
router.put('/:id', updateEvent);
router.delete('/:id',isAuthenticated,isAdmin, deleteEvent);


export default router;
