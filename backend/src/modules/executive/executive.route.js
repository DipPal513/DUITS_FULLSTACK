


import express from 'express';
import { createExecutive, deleteExecutive, getExecutiveById, getExecutives, updateExecutive } from './executive.controller.js';


const router = express.Router();

// Upload image while creating executive

router.post('/', createExecutive);
// CRUD routes
router.get('/', getExecutives);
router.get('/:id', getExecutiveById);
router.put('/:id', updateExecutive);
router.delete('/:id', deleteExecutive);

export default router;