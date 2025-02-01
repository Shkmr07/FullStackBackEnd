const express = require("express");
const connectdb = require("./config");
const routes = require("./src/routes");
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api",routes)

app.get("/", (req, res) => {
  res.send("Welcome to my API! Use /api to access routes.");
});


connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed!",err.message);
    process.exit(1);
  });
