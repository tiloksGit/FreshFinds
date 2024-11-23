const BuyerModel = require("../models/BuyerModel");
const Cart = require("../models/Cart");
const ProductsModel = require("../models/ProductsModel");
const Products = require("../models/ProductsModel");
const Seller = require("../models/SellerModel");
const mailSender = require("../middleware/sendGridMail");
//all users controls

const getAllProducts = async (req, res) => {
  try {
    const item = await ProductsModel.find();
    return res.status(200).json({ success: true, items: item });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

//Seller Controls
const addItem = async (req, res) => {
  const {
    seller_id,
    item_name,
    description,
    condition,
    price,
    category,
    item_age,
  } = req.body;
  if (
    !seller_id?.length ||
    !item_name?.length ||
    !description ||
    !condition ||
    !category ||
    !price ||
    !item_age
  ) {
    return res.status(404).json({ message: "All fields are required" });
  }
  try {
    sellerMatch = await Seller.findOne({ user_id: seller_id });
    if (!sellerMatch) {
      return res.status(400).json({ message: "Seller not found" });
    }
    const image_urls = req.files.map((file) => file.location);
    const item = new Products({
      seller_id,
      item_name,
      item_age,
      description,
      condition,
      price,
      category,
      image_urls,
    });

    await Seller.findOneAndUpdate(
      { user_id: seller_id },
      { $set: { item_counts: sellerMatch.item_counts + 1 } },
      { new: false }
    );
    await item.save();
    return res.status(201).json({ message: "Product added" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const removeItem = async (req, res) => {
  const item_id = req.query.id;
  console.log(item_id);
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

//Buyer Item Controls

const showInterest = async (req, res) => {
  const { seller_id, buyer_id, item_id } = req.body;
  if (!seller_id || !buyer_id || !item_id) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const seller = await Seller.findOne({
      user_id: seller_id,
    });
    const buyer = await BuyerModel.findOne({ user_id: buyer_id });
    const item = await Products.findOne({ _id: item_id });
    if (!buyer || !seller || !item) {
      return res
        .status(404)
        .json({ success: false, message: "User or item not found" });
    }
    const dup = await Cart.findOne({ seller_id, buyer_id, item_id });
    if (dup) {
      return res
        .status(301)
        .json({ success: false, message: "Duplicate entry" });
    }
    const newCartItem = new Cart({
      seller_id,
      buyer_id,
      item_id,
    });

    newCartItem.save();
    res
      .status(200)
      .json({ success: true, message: "Succesfully added to cart" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const revokeInterest = async (req, res) => {
  const { _id } = req.query;
  if (!_id) {
    return res
      .status(400)
      .json({ success: false, message: "cart_id is required" });
  }
  try {
    const cart_item = await Cart.findOne({
      _id,
    });
    if (!cart_item) {
      return res
        .status(404)
        .json({ success: false, message: "cart item not found" });
    }
    await Cart.deleteOne({ _id });
    res.status(200).json({ success: true, message: "cart item removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getProductRequests = async (req, res) => {
  const { _id, role } = req.query;
  if (!_id?.length || !role) {
    return res.status(400).json({ success: false, message: "id not found" });
  }

  try {
    const cart_requests = await Cart.find({ [`${role}_id`]: _id });
    res.status(200).json({ success: true, cart_requests });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const approveRequest = async (req, res) => {
  const { cart_id } = req.query;
  if (!cart_id?.length) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const cartItem = await Cart.findOne({ _id: cart_id });
    if (!cartItem) {
      return res
        .status(400)
        .json({ success: false, message: "item not found in cart" });
    }
    const customer = await User.findOne({ _id: Cart.buyer_id });
    await Cart.findOneAndUpdate(
      { _id: cart_id },
      { $set: { approved: !cartItem.approved } },
      { new: false }
    );
    const mailText = {
      to: customer.email, // Recipient's email
      from: "freshfinds860@gmail.com", // Your verified sender email
      subject: subject,
      html: `<!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Email Verification</title>
     <style>
         body {
             font-family: Arial, sans-serif;
             margin: 0;
             padding: 0;
             background-color: #f9f9f9;
             color: #333;
         }
         .container {
             max-width: 600px;
             margin: 20px auto;
             background-color: #ffffff;
             border-radius: 8px;
             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
             padding: 20px;
         }
         .header {
             text-align: center;
             background-color: #4CAF50;
             padding: 10px 0;
             border-radius: 8px 8px 0 0;
             color: #fff;
         }
         .header h1 {
             margin: 0;
             font-size: 24px;
         }
         .content {
             text-align: center;
             padding: 20px;
         }
         .code {
             font-size: 32px;
             font-weight: bold;
             color: #4CAF50;
             margin: 20px 0;
         }
         .footer {
             text-align: center;
             font-size: 12px;
             color: #666;
             margin-top: 20px;
             border-top: 1px solid #eee;
             padding-top: 10px;
         }
         .footer a {
             color: #4CAF50;
             text-decoration: none;
         }
     </style>
 </head>
 <body>
     <div class="container">
         <!-- Header -->
         <div class="header">
             <h1>Welcome to FreshFinds!</h1>
         </div>
 
         <!-- Main Content -->
         <div class="content">
             <p>Hi there,</p>
             <p>Thank you for signing up with FreshFinds! Please verify your email address by using the 4-digit verification code below:</p>
             <div class="code">${randomNumber}</div> <!-- Correctly interpolating the value here -->
             <p>This code will expire in 10 minutes. If you didn’t request this verification, please ignore this email.</p>
         </div>
 
         <!-- Footer -->
         <div class="footer">
             <p>If you have any questions, contact us at <a href="mailto:support@freshfinds.com">support@freshfinds.com</a>.</p>
             <p>&copy; 2024 FreshFinds. All rights reserved.</p>
         </div>
     </div>
 </body>
 </html>`,
    };
    if (!cartItem.approved) {
      const mailSuccess = await mailSender(mailText);
    }
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addItem,
  removeItem,
  updateItem,
  showInterest,
  revokeInterest,
  getAllProducts,
  getProductRequests,
  approveRequest,
};
