import express from 'express';
import {
  registerMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
} from './member.controller.js';

const router = express.Router();

// Public route req for admin registration
router.post('/register', registerMember);

// Admin routes
router.get('/', getMembers);
router.get('/:id', getMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;
