const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role:{type:String,default:"user"}
})

const userModel = model("User", userSchema);
module.exports = userModel;