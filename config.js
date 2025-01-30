const mongoose = require("mongoose")

const connectdb = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅Connected to db.")
    }catch(err){
        console.error("❌Error connecting to mongoDB.")
        process.exit(1)
    }
}

module.exports = connectdb