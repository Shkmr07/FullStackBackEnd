/* This JavaScript code defines an authentication middleware function that is used to verify and decode
JWT tokens for user authentication in a Node.js application. Here is a breakdown of what the code is
doing: */

const BlacklistToken = require("../models/BlacklistToken");
const jwt = require("jsonwebtoken");

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
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decode;
    next();

  } catch (err) {
    return res.status(500).json({ Error: `❌ Internal Error ${err.message}` });
  }
};


module.exports = authentication
