const router = require("express").Router();
const RegisterController = require("../Controllers/signup");
router.post("/signup", RegisterController.Signup);
router.post("/signup/verify-otp", RegisterController.verifyOTP);

module.exports = router;
