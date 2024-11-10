const mongoose = require("mongoose");

const ProductsModel = mongoose.Schema({
  seller_id: { type: mongoose.Types.ObjectId, ref: "Seller" },
  type: {
    type: Number,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
  },
  isListed: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductsModel);
