const router = require("express").Router();
const ItemController = require("../Controllers/ItemsController");
const UserController = require("../Controllers/UserController");
const ReviewController = require("../Controllers/reviewController");
const upload = require("../config/multerConfig");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Ok you are logged in" });
});

/*Product endpoints*/
router.post("/add-product", upload.array("images", 10), ItemController.addItem);
router.delete("/remove-product", ItemController.removeItem);

/*User endpoints*/

router.post("/get-user-complete", UserController.getCompleteUserDetails);
router.delete("/remove-user", UserController.deleteUser);

/*Review endpoints*/

router.post("/review/add", ReviewController.addReview);
router.delete("/review/remove", ReviewController.deleteReview);
router.patch("/review/update", ReviewController.updateReview);

/*Cart endpoints*/
router.get("/get-products-requests", ItemController.getProductRequests);
router.patch("/change_request_status", ItemController.approveRequest);
router.post("/add-to-cart", ItemController.showInterest);
router.delete("/rmfcart", ItemController.revokeInterest);

module.exports = router;
