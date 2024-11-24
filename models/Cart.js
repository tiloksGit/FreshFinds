const mongoose = require("mongoose");

const CartModel = mongoose.Schema({
  buyer_id: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  seller_id: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  item_id: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  item_name: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model("Cart", CartModel);
