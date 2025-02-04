/* This JavaScript code defines several functions related to managing products in an application. Here
is a breakdown of what each function does: */

const Product = require("../models/Product");
const cloudinary = require("../controllers/cloudinary");

const createProduct = async (req, res) => {
  const payload = req.body;
  if (req.file) {
    try {
      payload.image = await cloudinary(req.file.path);
    } catch (uploadError) {
      return res
        .status(500)
        .json({ error: `❌ Error uploading image: ${uploadError.message}` });
    }
  }
  try {
    const product = new Product(payload);
    product.userId = req.user.userId;
    await product.save();
    res.status(201).json({ message: "✅ Product added successfully" });
  } catch (err) {
    res.status(500).json({ error: `❌ Error creating product ${err.message}` });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "no products found" });
    }
    res.status(200).json({ message: "✅ Get Products", products });
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error getting the products ${err.message}` });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "no product found" });
    }
    if (req.user?.userId !== product.userId && req.user?.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized to update this product." });
    }

    await Product.findByIdAndUpdate(id, payload);
    res.status(201).json({ message: "✅ Product updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error updating the product ${err.message}` });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "no product found" });
    }
    if (req.user?.userId !== product.userId && req.user?.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Unauthorized to delete this product." });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "✅ Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: `❌ Error deleting the product ${err.message}` });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
