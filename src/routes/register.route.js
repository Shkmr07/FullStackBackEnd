/* This code snippet is creating a route in a Node.js application using the Express framework. It
requires the Express module, as well as a controller function for creating a user. It then defines a
route using `express.Router()` and sets up a POST request handler for that route, which will call
the `createUser` function when the route is accessed. Finally, it exports the `registerRoute` so
that it can be used in other parts of the application. */

const express = require("express");
const createUser = require("../controllers/register.controller");

const registerRoute = express.Router();

registerRoute.post("/", createUser);

module.exports = registerRoute;
