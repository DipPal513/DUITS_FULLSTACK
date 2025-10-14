const isAdmin = (req, res, next) => {

    console.log("isAdmin middleware ---", req.user);
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
  }
};

export default isAdmin;