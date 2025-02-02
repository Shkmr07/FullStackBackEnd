module.exports = (roleArr) => {
  return (req, res, next) => {
    try {
      const role = req?.user?.role;
      if (role && roleArr.includes(role)) {
        return next();
      }
      res
        .status(403)
        .json({ message: "Forbidden: You do not have the required role" });
    } catch (err) {
      next(err);
    }
  };
};
