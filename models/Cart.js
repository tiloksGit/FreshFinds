const mongoose = require("mongoose");

const CartModel = mongoose.Schema({
  buyer_id: {
    type: mongoose.Types.ObjectId,
    ref: "Buyer",
  },
  item_id: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Cart", CartModel);
