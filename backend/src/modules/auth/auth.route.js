import express from 'express';
import { register, login,logout,getAllUsers,roleChange, deleteUser, checkMe } from './auth.controller.js';
import isAdmin from '../../middleware/isAdmin.js';
import isAuthenticated from '../../middleware/isAuthenticated.js';
// import isAuthenticated from '../../middleware/isAuthenticated.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', isAuthenticated, checkMe);
router.post('/logout', logout);
router.get('/users', isAuthenticated, getAllUsers);
router.patch('/users/:userId/role', isAdmin, roleChange);
router.delete('/users/:userId', isAdmin, deleteUser);
export default router;
