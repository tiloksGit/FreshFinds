const router = require("express").Router();
const ItemController = require("../Controllers/ItemsController");
const UserController = require("../Controllers/UserController");
router.get("/", (req, res) => {
  res.status(200).json({ message: "Ok you are logged in" });
});

router.post("/add-product", ItemController.addItem);
router.delete("/remove-product", ItemController.removeItem);
router.delete("/remove-user", UserController.deleteUser);
module.exports = router;
