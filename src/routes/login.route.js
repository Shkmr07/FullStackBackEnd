const express = require("express");
const loginUser = require("../controllers/login.controller");

const loginRoute = express.Router();

loginRoute.post("/", loginUser);

module.exports = loginRoute;
