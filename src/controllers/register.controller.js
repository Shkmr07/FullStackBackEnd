const User = require("../models/User");

const createUser = async (req, res) => {
  const payload = req.body;
  try {
    await User.create(payload);
    res.status(201).json({ message: "✅ User added successfully" });
  } catch (err) {
    res.status(500).json({ error: `❌ Error creating user ${err.message}` });
  }
};


module.exports = createUser
