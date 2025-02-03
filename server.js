/* This JavaScript code sets up a basic Express server with some middleware and routes. Here's a
breakdown of what each part does: */

const express = require("express");
const connectdb = require("./config");
const routes = require("./src/routes");
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();

const corsOptions = {
  origin: 'https://stirring-baklava-e8268c.netlify.app',
  methods : ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders : ["Content-Type","Authorization"],
  credentials : true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser())
app.use("/api",routes)

app.get("/", (req, res) => {
  res.send("🎉 Welcome to my API! 🚀 Use /api to access the routes. 🔥");
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
