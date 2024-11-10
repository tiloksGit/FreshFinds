const router = require("express").Router();
const AuthenticationController = require("../Controllers/authenticate");

router.post("/login", AuthenticationController.authenticateUser);

module.exports = router;
