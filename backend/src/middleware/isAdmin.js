const isAdmin = (req, res, next) => {
  console.log(req.user)
};

export default isAdmin;