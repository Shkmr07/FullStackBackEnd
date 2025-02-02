const express = require("express")
const { createProduct, getProducts } = require("../controllers/product.controller")
const upload = require("../middlewares/multer")
const authentication = require("../middlewares/auth.middleware")
const authorization = require("../middlewares/authorization")

const productRoute = express.Router()

productRoute.post("/",authentication,authorization(["admin","user"]),upload.single("file"),createProduct)
productRoute.get("/",getProducts)

module.exports = productRoute