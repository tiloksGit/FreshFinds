const router = require("express").Router();
const GetController = require("../Controllers/ItemsController");
router.get("/get-products", GetController.getAllProducts);

module.exports = router;
