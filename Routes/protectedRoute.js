const router = require("express").Router();
const express = require("express");
const app = express();
const { verify } = require("jsonwebtoken");
const verifyLogin = require("../middleware/authenticateMiddleware");

router.get("/", verifyLogin, (req, res) => {
  res.status(200).json({ message: "Ok you are logged in" });
});

module.exports = router;
