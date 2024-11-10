const User = require("../models/userModel");
const Seller = require("../models/SellerModel");
const Buyer = require("../models/BuyerModel");
const Product = require("../models/ProductsModel");
const Cart = require("../models/Cart");

const updateAddress = async (req, res) => {
  const { id, address, role } = req.body;
  if (!id || !address) {
    return res.status(400).json({ message: "address field required" });
  }
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id, role } = req.body;
  if (!id || !role) {
    return res.status(400).json({ message: "address field required" });
  }
  try {
    const user = await User.findOne({ _id: id });
    if (!user || user.role != role) {
      return res
        .status(404)
        .json({ message: "user with the specified role not found" });
    }
    await User.deleteOne({ _id: id });
    if (role == "seller" || role == "Seller") {
      const seller = await Seller.findOne({ user_id: id });
      const it = await Seller.deleteOne({ user_id: id });
      console.log(it);
      Product.deleteMany({ seller_id: seller._id });
    } else if (role == "buyer" || role == "Buyer") {
      const buyer = await Buyer.findOne({ user_id: id });
      await Cart.deleteMany({ user_id: buyer._id });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};
module.exports = { updateAddress, deleteUser };
