const express = require("express");
const createUser = require("../controllers/register.controller");

const registerRoute = express.Router();

registerRoute.post("/", createUser);

module.exports = registerRoute;
