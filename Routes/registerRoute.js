const router = require("express").Router();
const RegisterController = require("../Controllers/signup");
router.post("/signup", RegisterController.Signup);

module.exports = router;
