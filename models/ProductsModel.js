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
  Condition: {
    type: String,
  },
  isListed: {
    type: bool,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
