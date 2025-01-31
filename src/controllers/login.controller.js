const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  

  const cookieAge = (expire) => {
    const time = expire.slice(-1);
    const value = parseInt(expire, 10);
    switch (time) {
      case "d":
        return value * 24 * 60 * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "m":
        return value * 60 * 1000;
      default:
        return value * 1000;
    }
  };

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!password) {
      return res.status(400).json({ message: "Wrong Credentials!" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.PRIVATE_KEY,
      { expiresIn: process.env.ACCESS_TOKEN }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.PRIVATE_KEY,
      { expiresIn: process.env.REFRESH_TOKEN }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: cookieAge(process.env.REFRESH_TOKEN),
    });
    res.status(200).json({ message: "✅ login successful", accessToken });
  } catch (err) {
    res.status(500).json({ error: `❌ Error while login ${err.message}` });
  }
};

module.exports = loginUser