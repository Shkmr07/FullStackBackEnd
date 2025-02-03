const express = require("express");
const createToken = require("../controllers/refresh.controller");
const authentication = require("../middlewares/auth.middleware");

const refreshRoute = express.Router();

refreshRoute.post("/",createToken);

module.exports = refreshRoute;
