const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BlacklistToken = require("../models/BlacklistToken");
const expireTime = require("./expireTime");

const createToken = async (req, res) => {
  const token = req.headers?.authorization.replace("Bearer ", "");
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) {
    return res.status(404).json({ message: "Refresh token not present" });
  }
  try {
    const decode = jwt.verify(refreshToken, process.env.PRIVATE_KEY);
    const user = await User.findOne({ _id: decode.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    await BlacklistToken.create({
      token,
      expireAt: new Date(Date.now() + expireTime(process.env.ACCESS_TOKEN)),
    });

    const accessToken = jwt.sign(
      { userId: user._id, role : user.role},
      process.env.PRIVATE_KEY,
      { expiresIn: process.env.ACCESS_TOKEN }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expired" });
    }
    return res
      .status(500)
      .json({ error: `❌ Error generating accessToken ${err.message}` });
  }
};

module.exports = createToken;
