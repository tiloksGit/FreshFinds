const Products = require("../models/ProductsModel");
const Seller = require("../models/SellerModel");

//Buyer Controls
const addItem = async (req, res) => {
  const { seller_id, item_name, description, condition, price, type } =
    req.body;
  if (
    !seller_id ||
    !item_name ||
    !description ||
    !condition ||
    !type ||
    !price
  ) {
    return res.status(404).json({ message: "All fields are required" });
  }
  try {
    sellerMatch = await Seller.findOne({ seller_id });
    if (!sellerMatch) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const item = new Products({
      seller_id,
      item_name,
      description,
      condition,
      price,
      type,
    });

    await item.save();
    return res.status(201).json({ message: "Product added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const removeItem = async (req, res) => {
  const { item_id } = req.body;
  if (!item_id) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const item = await Products.findOne({ _id: item_id });
    if (!item) {
      return res.status(404).json({ message: "item not find" });
    }

    await Products.deleteOne({ _id: item_id });

    res.status(200).json({ message: "Item removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateItem = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

//User Item Controls

const showInterest = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const revokeInterest = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addItem,
  removeItem,
  updateItem,
  showInterest,
  revokeInterest,
};
