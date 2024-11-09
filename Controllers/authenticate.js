const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.findOne({ username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
  } catch (err) {}
};
