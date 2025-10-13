const isAdmin = (req, res, next) => {
  const user = req.user; // Set by auth middleware
  if (!user || user.role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }
  next();
};
export default isAdmin;