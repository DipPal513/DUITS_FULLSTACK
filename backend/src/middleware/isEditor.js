import jwt from 'jsonwebtoken';

const isEditor = (req, res, next) => {
  const token = req.cookies.authToken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'EDITOR') return res.status(403).json({ success: false, message: 'Access denied. Editors only.' });
    
    next();
}


export default isEditor;