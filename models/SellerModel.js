const mongoose = require("mongoose");

const SellerModel = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  item_counts: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Seller", SellerModel);
