const express = require("express")
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/product.controller")
const upload = require("../middlewares/multer")
const authentication = require("../middlewares/auth.middleware")
const authorization = require("../middlewares/authorization")

const productRoute = express.Router()

productRoute.get("/",getProducts)
productRoute.post("/",authentication,authorization(["admin","user"]),upload.single("image"),createProduct)
productRoute.put("/:id",authentication,authorization(["admin","user"]),updateProduct)
productRoute.delete("/:id",authentication,authorization(["admin","user"]),deleteProduct)

module.exports = productRoute