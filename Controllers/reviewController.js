const Review = require("../models/Review");
const Buyer = require("../models/BuyerModel");
const Seller = require("../models/SellerModel");

const addReview = async (req, res) => {
  const { seller_id, buyer_id, reviewText } = req.body;
  if (!seller_id || !buyer_id || !reviewText) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
  try {
    const seller = await Seller.findOne({ seller_id });
    const buyer = await Buyer.findOne({ buyer_id });

    if (!seller || !buyer) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    const newReview = Review({
      seller_id,
      buyer_id,
      review: reviewText,
    });

    newReview.save();
    return res.status(200).json({ success: true, message: "review saved" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateReview = async (req, res) => {
  const { reviewId, reviewText } = req.body;
  if (!reviewId || !reviewText) {
    return res
      .status(400)
      .json({ success: false, message: "all fields are required" });
  }
  try {
    const update = Review.findOneAndUpdate(
      { _id: reviewId },
      { $set: { review: reviewText } },
      { new: false }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.query;
  if (!reviewId) {
    return res
      .status(400)
      .json({ success: false, message: "reviewId required" });
  }
  try {
    await Review.deleteOne({ _id: reviewId });
    return res.status(200).json({ success: true, message: "review Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { addReview, updateReview, deleteReview };
