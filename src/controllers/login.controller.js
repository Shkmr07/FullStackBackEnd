const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")

const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message : "User not found!"})
        }

        const isPassword = await bcrypt.compare(password,user.password)
        if(!password){
            return res.status(400).json({message : "Wrong Credentials!"})
        }

        const accessToken = jwt.sign({userId : user._id},process.env.PRIVATE_KEY, {expiresIn : process.env.ACCESS_TOKEN})
        const refreshToken = jwt.sign({userId : user._id},process.env.PRIVATE_KEY, {expiresIn : process.env.REFRESH_TOKEN})

        res.cookie("jwt",refreshToken, {
            httpOnly : true,
            sameSite : "None",
            // maxAge : 
        })
    }catch(err) {
        res.status(500).json({error : `❌ Error while login ${err.message}`})
    }
}