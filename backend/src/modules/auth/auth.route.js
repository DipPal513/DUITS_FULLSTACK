import express from 'express';
import { register, login, getCurrentUser,logout,getAllUsers,roleChange } from './auth.controller.js';
import isAdmin from '../../middleware/isAdmin.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', getCurrentUser);
router.post('/logout', logout);
router.get('/users', getAllUsers);
router.patch('/users/:userId/role', isAdmin, roleChange);

export default router;
