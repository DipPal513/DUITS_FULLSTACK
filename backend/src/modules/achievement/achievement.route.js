import express from 'express';
import {
  createAchievement,
  deleteAchievement,
  getAchievements,updateAchievement,singleAchievement
} from './achievement.controller.js';
import isAuthenticated from '../../middleware/isAuthenticated.js';
import isAdmin from '../../middleware/isAdmin.js';

const router = express.Router();

// Upload image while creating Achievement
router.post('/',isAuthenticated, createAchievement);
router.get('/', getAchievements);
router.put('/:id', updateAchievement);
router.delete('/:id',isAuthenticated,isAdmin, deleteAchievement);
router.get('/:id', singleAchievement);


export default router;
