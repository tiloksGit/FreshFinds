const mongoose = require("mongoose");

const ProductsModel = mongoose.Schema({
  seller_id: { type: mongoose.Types.ObjectId, ref: "User" },
  category: {
    type: String,
    required: true,
  },
  item_name: {
    type: String,
    required: true,
  },
  image_urls: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  item_age: {
    type: Number,
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
