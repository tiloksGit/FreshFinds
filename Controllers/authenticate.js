const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ email: username });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "authentication failed" });
    }

    pwdMatch = await bcrypt.compare(password, user.password);
    if (!pwdMatch) {
      return res
        .status(401)
        .json({ messaged: "Unauthorized: authentication failed" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30min",
    });
    res.status(200).json({
      accessToken: token,
      user: { user_id: user._id, name: user.name, role: user.role },
      message: "user succesfully logged in",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Server Error" });
  }
};

module.exports = { authenticateUser };
