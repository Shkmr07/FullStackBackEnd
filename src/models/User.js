/* This JavaScript code snippet is defining a Mongoose schema for a User model in a Node.js
application. Here's a breakdown of what each part of the code is doing: */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email",
      ],
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    password: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password may contain UpperCase, LowerCase, Special Character and atleast 8 characters.",
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 6);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
