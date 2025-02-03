const mongoose = require("mongoose");
const cloudinary = require("../controllers/cloudinary");
const path = require("path");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: String,
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be a nagative value."],
    },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);


module.exports = mongoose.model("Product", ProductSchema);
