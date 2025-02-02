const express = require("express")
const registerRoute = require("./register.route")
const loginRoute = require("./login.route")
const productRoute = require("./product.route")
const refreshRoute = require("./refresh.route")

const routes = express.Router()

routes.use("/auth/signup",registerRoute)
routes.use("/auth/login",loginRoute)
routes.use("/products",productRoute)
routes.use("/auth/token",refreshRoute)

module.exports = routes