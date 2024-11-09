const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  year_of_study: { type: Number },
  role: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("Users", userSchema);