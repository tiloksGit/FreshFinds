const router = require("express").Router();
const GetController = require("../Controllers/ItemsController");
router.get("/get-products", GetController.getAllProducts);

/*Admin endpoints*/

router.post("/getallusers", Admin.getAllUser)
module.exports = router;
