const express = require("express");
const connectdb = require("./config");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("api/",routes)

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed!",err.message);
    process.exit(1);
  });
