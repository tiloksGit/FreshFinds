const BuyerModel = require("../models/BuyerModel");
const Cart = require("../models/Cart");
const ProductsModel = require("../models/ProductsModel");
const Products = require("../models/ProductsModel");
const Seller = require("../models/SellerModel");
const mailSender = require("../middleware/sendGridMail");
const User = require("../models/userModel");
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
    const Recipient = await User.findOne({ _id: seller.user_id });
    const newCartItem = new Cart({
      seller_id,
      buyer_id,
      item_id,
    });

    newCartItem.save();
    const appUrl = "efsadfjl.cmom";
    const mailText = {
      to: Recipient.email, // Recipient's email
      from: "freshfinds860@gmail.com", // Your verified sender email
      subject: "Fresh Finds updates",
      html: `<!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            h1 {
                color: #4CAF50;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
            }
            .footer {
                font-size: 0.9em;
                color: #555;
                margin-top: 20px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Great News! 🎉</h1>
            <p>Dear <strong>${Recipient.name}</strong>,</p>
            <p>We’re thrilled to share some exciting news—someone has shown interest in your product, <strong>${item.item_name}</strong>, listed on <em>Fresh Finds</em>!</p>
            <p>Here’s how you can make the most of this opportunity:</p>
            <ul>
                <li><strong>Connect with the Buyer:</strong> Log in to the app to check their message or contact details.</li>
                <li><strong>Keep Your Listing Updated:</strong> Confirm the product details and availability to ensure smooth communication.</li>
                <li><strong>Respond Quickly:</strong> Buyers love prompt responses—it’s the key to a successful sale!</li>
            </ul>
            <a href= "${appUrl} class="button">Log In to Fresh Finds</a>
            <p>Thank you for choosing Fresh Finds to showcase your product. 
            <p>Wishing you a successful sale!</p>
            <p>Warm regards,<br>
            <strong>The Fresh Finds Team</strong></p>
            <div class="footer">
                <p>&copy; 2024 Fresh Finds. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `,
    };
    const mailSuccess = await mailSender(mailText);
    console.log(mailSuccess);
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
    const product = await Products.findOne({ _id: cartItem.item_id });
    const customer = await User.findOne({ _id: cartItem.buyer_id });
    await Cart.findOneAndUpdate(
      { _id: cart_id },
      { $set: { approved: !cartItem.approved } },
      { new: false }
    );

    const appUrl = "efsadfjl.cmom";
    const mailText = {
      to: customer.email, // Recipient's email
      from: "freshfinds860@gmail.com", // Your verified sender email
      subject: "Fresh Finds updates",
      html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #4CAF50;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            font-size: 0.9em;
            color: #555;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Good News! 🎉</h1>
        <p>Dear <strong>${customer.name}</strong>,</p>
        <p>We’re excited to inform you that your request for <strong>${product.item_name}</strong> has been accepted by the seller on <em>Fresh Finds</em>!</p>
        <p>What’s next?</p>
        <ul>
            <li><strong>Contact the Seller:</strong> Log in to the app to view the seller’s message or contact details.</li>
            <li><strong>Finalize the Details:</strong> Confirm payment, delivery, or pickup arrangements with the seller.</li>
        </ul>
        <a href=${appUrl} class="button">Log In to Fresh Finds</a>
        <p>Thank you for using Fresh Finds! If you have any questions or need assistance</p> <p>We wish you a seamless and successful transaction!</p>
        <p>Warm regards,<br>
        <strong>The Fresh Finds Team</strong></p>
        <div class="footer">
            <p>&copy; 2024 Fresh Finds. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
    };
    if (!cartItem.approved) {
      const mailSuccess = await mailSender(mailText);
      console.log(mailSuccess);
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
