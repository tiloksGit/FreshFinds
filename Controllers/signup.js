const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const { email, password, name, phone, year_of_study, role } = req.body;
    if (!email || !password || !name || !phone || !year_of_study || !role) {
      return res.status(400).json({ message: "All fields are required" });
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
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

module.exports = { Signup };
