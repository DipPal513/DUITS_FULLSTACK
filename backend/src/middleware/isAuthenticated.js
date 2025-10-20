// as i sent cookie from server so need to create a midlleware to check cookie
import jwt from 'jsonwebtoken';


 const isAuthenticated = async (req, res, next) => {

  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export default isAuthenticated;