import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { checkMeService, getAllUsersService,deleteUserService, loginUser, registerUserService, roleChangeService } from './auth.model.js';


export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await loginUser(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await registerUserService({ name, email, password: hashedPassword, role });
    res.status(201).json({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('authToken', token, { 
    httpOnly: true,
    secure: true, 
    sameSite: 'None', 
    maxAge: 24*60*60*1000,
   
}); 
    res.json({ success: true, user: { id: user.id, name: user.name, email, role: user.role }, token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
export const roleChange = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
  
    const user = await roleChangeService(userId, role);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ 
        success: true, 
        message: `Role successfully updated to ${user.role}.`,
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
export const checkMe = async (req, res, next) => {
  try {
    console.log("checkMe called with user:", req.user);
    const userId = req.user.id;
    const user = await checkMeService(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};
export const logout = (req, res) => {
  
  res.clearCookie('authToken');
  res.json({ success: true, message: 'Logged out successfully' });
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await deleteUserService(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
