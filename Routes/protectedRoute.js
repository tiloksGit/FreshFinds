const router = require("express").Router();
const verifyLogin = require("../middleware/authenticateMiddleware");
const ItemController = require("../Controllers/ItemsController");
const UserController = require("../Controllers/UserController");
router.get("/", verifyLogin, (req, res) => {
  res.status(200).json({ message: "Ok you are logged in" });
});

router.post("/add-product", verifyLogin, ItemController.addItem);
router.post("/remove-product", verifyLogin, ItemController.removeItem);

router.delete("/remove-user", verifyLogin, UserController.deleteUser);
module.exports = router;
