const express = require("express")
const createUser = require("../controllers/register.controller")

const registerRoute = express.Router()

registerRoute.post("/",createUser)
registerRoute.get("/",(req,res)=>{
    res.send({message : "hi i'm working fine now."})
})


module.exports = registerRoute