const mongoose = require("mongoose");

const ReviewModel = mongoose.Schema({
  seller_id: {
    type: mongoose.Types.ObjectId,
    ref: "Seller",
  },
  buyer_id: {
    type: mongoose.Types.ObjectId,
    ref: "Buyer",
  },
});
