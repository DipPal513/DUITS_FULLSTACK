import express from 'express';
import {
  createNotice,
  deleteNotice,
  getNotices,updateNotice,singleNotice
} from './notice.controller.js';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import isAdmin from '../../middleware/isAdmin.js';

const router = express.Router();

// Upload image while creating Notice
router.post('/',isAuthenticated, createNotice);
router.get('/', getNotices);
router.put('/:id', updateNotice);
router.delete('/:id',isAuthenticated,isAdmin, deleteNotice);
router.get('/:id', singleNotice);


export default router;
