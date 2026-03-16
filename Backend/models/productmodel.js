const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  discription:String
});

module.exports = model("Product", productSchema);