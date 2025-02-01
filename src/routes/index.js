const express = require("express")
const registerRoute = require("./register.route")

const routes = express.Router()

routes.use("/register",registerRoute)

module.exports = routes