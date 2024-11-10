const Products = require("../models/ProductsModel");
const Seller = require("../models/SellerModel");

//Buyer Controls
const addItem = async (req, res) => {
  const { seller_id, item_name, description, condition, price } = req.body;
  if (!seller_id || !item_name || !description || !condition || !price) {
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
    });

    await item.save();
    return res.status(201).json({ message: "Product added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const removeItem = async (req, res) => {
  try {
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
