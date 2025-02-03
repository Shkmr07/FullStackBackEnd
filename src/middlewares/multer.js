/* This JavaScript code snippet is setting up a file upload configuration using the `multer` library.
Here's a breakdown of what each part of the code is doing: */

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../../", "uploads");

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
