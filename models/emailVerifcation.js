const mongoose = require("mongoose");

const OTP = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    year_of_study: { type: String },
    role: {
      type: String,
      default: "user",
    },
    address: String,
    otp: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", OTP);
