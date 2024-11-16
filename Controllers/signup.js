const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Seller = require("../models/SellerModel");
const Buyer = require("../models/BuyerModel");
// const mailController = require("../middleware/mailChecker");
const mailChecker = require("../middleware/sendGridMail");
const Otp = require("../models/emailVerifcation");

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
      console.log(dupS);
      console.log(dupB);
    }
    if ((dupS && role == "seller") || (dupB && role == "buyer")) {
      return res.status(409).json({ message: "User role already exist" });
    }
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const mailSuccess = await mailChecker(email, randomNumber);
    console.log(mailSuccess);
    if (mailSuccess) {
      const newOtp = new Otp({
        email,
        password,
        name,
        phone,
        year_of_study,
        role,
        otp: randomNumber,
        address,
      });
      newOtp.save();
      return res.status(200).json({ success: true, message: "OTP sent" });
    }
    res.status(400).json({ success: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  } finally {
    dupS = false;
    dupB = false;
  }
};

const verifyOTP = async (req, res) => {
  const { otp, email } = req.body;
  if (!otp || !email) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
  try {
    const reqUser = await Otp.findOne({ email, otp });
    if (!reqUser) {
      return res.status(404).json({ success: false, message: "not found" });
    }
    const expired = otpExpiryCheck(reqUser.createdAt);
    if (expired) {
      Otp.deleteOne(email, otp);
      return res.status(404).json({ success: false, message: "otp expired" });
    }
    const hashedPassword = await bcrypt.hash(reqUser.password, 10);

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
    }
    if (
      (dupS && reqUser.role == "seller") ||
      (dupB && reqUser.role == "buyer")
    ) {
      return res.status(409).json({ message: "User role already exist" });
    }
    if (!duplicateUser) {
      const user = new User({
        email,
        password: hashedPassword,
        name: reqUser.name,
        phone: reqUser.phone,
        year_of_study: reqUser.year_of_study,
        role: reqUser.role,
      });
      await user.save();
      if (reqUser.role == "seller" || reqUser.role == "Seller") {
        const newSeller = new Seller({
          user_id: user._id,
          item_counts: 0,
          address: reqUser.address,
        });
        newSeller.save();
      } else if (reqUser.role == "buyer" || reqUser.role == "Buyer") {
        const newBuyer = new Buyer({
          user_id: user._id,
          address: reqUser.address,
        });
        newBuyer.save();
      }
    } else {
      await User.findOneAndUpdate(
        { email },
        { $set: { role: "buyer+seller" } },
        { new: false }
      );
      if (reqUser.role == "seller" || reqUser.role == "Seller") {
        const newSeller = new Seller({
          user_id: duplicateUser._id,
          item_counts: 0,
          address: reqUser.address,
        });
        newSeller.save();
      } else if (reqUser.role == "buyer" || reqUser.role == "Buyer") {
        const newBuyer = new Buyer({
          user_id: duplicateUser._id,
          address: reqUser.address,
        });
        newBuyer.save();
      }
    }
    Otp.deleteOne({ email, otp });
    res
      .status(200)
      .json({ success: true, message: "user successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  } finally {
    dupS = false;
    dupB = false;
  }
};

const otpExpiryCheck = (timestamp) => {
  const now = new Date();
  const timeDifference = now - timestamp; // Difference in milliseconds

  const tenMinutes = 10 * 60 * 1000;

  if (timeDifference > tenMinutes) {
    return true;
  } else {
    return false;
  }
};
module.exports = { Signup, verifyOTP };
