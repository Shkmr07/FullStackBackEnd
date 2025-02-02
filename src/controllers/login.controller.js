const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/BlacklistToken");
const expireTime = require("./expireTime");

const loginUser = async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Wrong Credentials!" });
    }

    const isJwt = req.cookies?.jwt;

    if (isJwt) {
      try {
        jwt.verify(isJwt, process.env.PRIVATE_KEY);

        const isBlacklisted = await BlacklistToken.findOne({ token: isJwt });

        if (isBlacklisted) {
          return res.status(403).json({ message: "❌ Token is blacklisted!" });
        }

        await BlacklistToken.create({
          token: isJwt,
          expireAt: new Date(Date.now() + expireTime(process.env.REFRESH_TOKEN)),
        });
      } catch (err) {
        console.log("Invalid token found in cookies, not blacklisting.");
      }
    }

    const accessToken = jwt.sign(
      { userId: user._id, role : user.role},
      process.env.PRIVATE_KEY,
      { expiresIn: process.env.ACCESS_TOKEN }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, role : user.role },
      process.env.PRIVATE_KEY,
      { expiresIn: process.env.REFRESH_TOKEN }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      maxAge: expireTime(process.env.REFRESH_TOKEN),
    });
    res.status(200).json({ message: "✅ login successful", accessToken });
  } catch (err) {
    res.status(500).json({ error: `❌ Error while login ${err.message}` });
  }
};

module.exports = loginUser;
