const mongoose = require("mongoose");

const BuyerModel = mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Buyer", BuyerModel);
