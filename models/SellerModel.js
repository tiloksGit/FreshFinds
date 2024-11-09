const mongoose = require("mongoose");
// const User = require("./userModel")

const SellerModel = mongoose.Schema({
  sellerId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  item_counts: {
    type: Number,
    default: 0,
  },
  Address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Seller", SellerModel);
