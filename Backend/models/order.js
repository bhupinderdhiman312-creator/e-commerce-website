const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
    productname: {
      type: String,
      required: true,
    },

    customername: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    image: {
      type: String, // store filename
      required: true,
    },

    // status: {
    //   type: String,
    //   default: "Pending",
    // },
  }
);

module.exports = mongoose.model("Order", orderSchema);