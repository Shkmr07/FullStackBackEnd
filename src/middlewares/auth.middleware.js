const BlacklistToken = require("../models/BlacklistToken");

const authentication = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(400).json({ message: "Login Required!" });
  }

  try {
    const blaclistToken = await BlacklistToken.findOne({ token });
    if (blaclistToken) {
      return res.status(401).json({ message: "Token blacklisted" });
    }
    next()
  } catch (err) {
    return res.status(500).json({ Error: `❌ Internal Error ${err.message}` });
  }
};
