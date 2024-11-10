const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Seller = require("../models/SellerModel");
const Buyer = require("../models/BuyerModel");

const emailRegex = /.+@nitc.ac.in$/;
const roles = ["admin", "seller", "buyer"];
let dupS = false;
let dupB = false;
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

    const noRole = roles.filter((item) => (item ? role == item : null));
    if (!noRole?.length) {
      return res.status(400).json({ success: false, message: "invalid role" });
    }
    emailVerified = emailRegex.exec(email);
    if (!emailVerified) {
      return res
        .status(400)
        .json({ message: "email outside institution not allowed" });
    }

    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      const duplicateSeller = await Seller.findOne({
        user_id: duplicateUser._id,
      });
      if (duplicateSeller) {
        dupS = true;
      }
      const duplicateBuyer = await Buyer.findOne({
        user_id: duplicateUser._id,
      });
      if (duplicateBuyer) {
        dupB = true;
      }
      console.log("buyer", duplicateBuyer);
    }
    if ((dupS && role == "seller") || (dupB && role == "buyer")) {
      return res.status(409).json({ message: "User role already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!duplicateUser) {
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
      } else if (role == "buyer" || role == "Buyer") {
        const newBuyer = new Buyer({
          user_id: user._id,
          address,
        });

        newBuyer.save();
      }
    } else {
      await User.findOneAndUpdate(
        { email },
        { $set: { role: "buyer+seller" } },
        { new: false }
      );

      if (role == "seller" || role == "Seller") {
        const newSeller = new Seller({
          user_id: duplicateUser._id,
          item_counts: 0,
          address,
        });

        newSeller.save();
      } else if (role == "buyer" || role == "Buyer") {
        const newBuyer = new Buyer({
          user_id: duplicateUser._id,
          address,
        });

        newBuyer.save();
      }
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

module.exports = { Signup };
