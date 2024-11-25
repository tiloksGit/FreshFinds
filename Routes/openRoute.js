const router = require("express").Router();
const GetController = require("../Controllers/ItemsController");
const Admin = require("../Controllers/adminController")
router.get("/get-products", GetController.getAllProducts);


module.exports = router;
