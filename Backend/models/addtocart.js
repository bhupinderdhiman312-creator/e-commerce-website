const { Schema, model } = require("mongoose");

const addtocartSchema = new Schema({

    name: String,
    price: Number,
    image: String

});

module.exports = model("AddToCart", addtocartSchema);