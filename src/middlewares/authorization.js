/* This code snippet is a middleware function in JavaScript that checks if the user making a request
has a specific role required to access certain routes or resources. Here's a breakdown of what the
code does: */

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
