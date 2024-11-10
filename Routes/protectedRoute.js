const router = require("express").Router();
const express = require("express");
const app = express();
const { verify } = require("jsonwebtoken");
const verifyLogin = require("../middleware/authenticateMiddleware");
const ItemController = require("../Controllers/ItemsController");
router.get("/", verifyLogin, (req, res) => {
  res.status(200).json({ message: "Ok you are logged in" });
});

router.post("/add-product", verifyLogin, ItemController.addItem);
module.exports = router;
