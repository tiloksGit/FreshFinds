const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
