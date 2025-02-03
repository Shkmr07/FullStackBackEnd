const cloudinary = require("cloudinary").v2;
const fs = require("fs");

module.exports = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return uploadResult.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error",err);
    throw err;
  }
};
