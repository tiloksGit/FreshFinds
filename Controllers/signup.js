const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Seller = require("../models/SellerModel");
const Buyer = require("../models/BuyerModel");

const Signup = async (req, res) => {
  try {
    const { email, password, name, phone, year_of_study, role, address } =
      req.body;
    if (
      !email ||
      !password ||
      !name ||
      !phone ||
      !year_of_study ||
      !role ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      year_of_study,
      role,
    });
    await user.save();
    if (role == "seller" || role == "Seller") {
      const newSeller = new Seller({
        user_id: user._id,
        item_counts: 0,
        address,
      });

      newSeller.save();
    } else if (role == "buyer" || role == "User") {
      const newBuyer = new Buyer({
        user_id: user._id,
        address,
      });

      newBuyer.save();
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

module.exports = { Signup };
