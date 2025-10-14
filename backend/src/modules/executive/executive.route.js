


import express from 'express';
import { createExecutive, deleteExecutive, getExecutiveById, getExecutives, updateExecutive } from './executive.controller.js';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import isAdmin from '../../middleware/isAdmin.js';


const router = express.Router();

// Upload image while creating executive

router.post('/',isAuthenticated,isAdmin, createExecutive);
// CRUD routes
router.get('/', getExecutives);
router.get('/:id', getExecutiveById);
router.put('/:id', updateExecutive);
router.delete('/:id',isAuthenticated,isAdmin, deleteExecutive);

export default router;