/* This code snippet is setting up a route for handling refresh token requests in a Node.js application
using Express framework. Here's a breakdown of what each part does: */

const express = require("express");
const createToken = require("../controllers/refresh.controller");
const authentication = require("../middlewares/auth.middleware");

const refreshRoute = express.Router();

refreshRoute.post("/",createToken);

module.exports = refreshRoute;
