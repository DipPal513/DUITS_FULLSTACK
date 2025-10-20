import User from './auth.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(201).json({ success: true, user: { id: user._id, name, email, role: user.role }, token });
  } catch (err) {
    next(err);
  }
};

// Login existing user
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

  
     
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('authToken', token, { httpOnly: true ,secure:false,sameSite:'Lax',maxAge:24*60*60*1000}); // 1 day
    res.json({ success: true, user: { id: user._id, name: user.name, email, role: user.role }, token });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const roleChange = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    console.log("requested userid", userId);
 
    // Validate new role
    // const validRoles = ['ADMIN', 'EDITOR', 'PENDING'];
    // if (!validRoles.includes(newRole)) {
    //   return res.status(400).json({ success: false, message: 'Invalid role specified' });
    // }

    // Update user role
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.log(err)
    next(err);
  }
};

// Me endpoint to get current user info from token
export const checkMe = async (req, res, next) => {
  try {
    console.log("checkMe called with user:", req.user);
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// Logout user (for JWT, this is typically handled client-side by deleting the token)
export const logout = (req, res) => {
  // REMOVE COOKIE
  res.clearCookie('authToken');
  res.json({ success: true, message: 'Logged out successfully' });
};


// Get all users (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};
//

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};