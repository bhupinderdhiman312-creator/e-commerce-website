const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config() 


const ConnectedDB = async (req, res) => {
    try{

        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoose connected")
    }
    catch (error) {
        console.log(error.message),
        process.exit(1)
    }
}


module.exports = ConnectedDB;