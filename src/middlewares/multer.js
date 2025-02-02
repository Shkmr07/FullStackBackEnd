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
