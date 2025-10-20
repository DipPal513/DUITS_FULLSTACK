import jwt from 'jsonwebtoken';

const isAdmin = (req, res, next) => {
  const token = req.cookies.authToken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    next();
  }


 


export default isAdmin;