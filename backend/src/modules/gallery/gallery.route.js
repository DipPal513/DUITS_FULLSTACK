import express from 'express';
import {
  createGallery,
  getGallery,
  updateGallery,
  deleteGallery
} from './gallery.controller.js';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import isAdmin from '../../middleware/isAdmin.js';

const router = express.Router();

// Upload image while creating event
router.post('/',isAuthenticated, createGallery);
router.get('/', getGallery);
router.put('/:id', updateGallery);
router.delete('/:id',isAuthenticated,isAdmin, deleteGallery);


export default router;
