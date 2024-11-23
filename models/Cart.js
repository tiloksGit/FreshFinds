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
  approved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Cart", CartModel);
