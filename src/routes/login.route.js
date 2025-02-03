/* This code snippet is setting up a route for handling login requests in a Node.js application using
Express framework. Here's a breakdown of what each part does: */

const express = require("express");
const loginUser = require("../controllers/login.controller");

const loginRoute = express.Router();

loginRoute.post("/", loginUser);

module.exports = loginRoute;
