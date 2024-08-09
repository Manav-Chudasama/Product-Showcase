import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import reviewSchema from "../models/reviewModel.js";
import freshProductsModel from "../models/freshProductsModel.js";
import thriftProductsModel from "../models/thriftProductsModel.js";

// add a review to the product
export const createReview = async (req, res) => {
  console.log("createReview");

  try {
    const {
      userId,
      username,
      productId,
      rating,
      reviewDescription,
      productType,
    } = req.body;

    if (
      !userId ||
      !username ||
      !productId ||
      !rating ||
      !reviewDescription ||
      !productType
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Determine which product array to use
    const productField =
      productType === "fresh" ? "freshProducts" : "thriftProducts";
    const validUserId = await userModel.findOne({ userId: userId }, { _id: 1 });
    const validProductId =
      productType == "fresh"
        ? await freshProductsModel.findOne({ _id: productId }, { _id: 1 })
        : await thriftProductsModel.findOne({ _id: productId }, { _id: 1 });

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(validUserId)) {
      console.log("not valid ObjectId: ", user._id);
      return res.status(400).json({
        success: false,
        message: "Invalid User ID.",
      });
    }

    // Check if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(validProductId)) {
      console.log("not valid ObjectId: ", validProductId._id);
      return res.status(400).json({
        success: false,
        message: "Invalid Product ID.",
      });
    }
    const product =
      productType == "fresh"
        ? await freshProductsModel.findOne({ _id: productId })
        : await thriftProductsModel.findOne({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add the review to the product's reviews array
    product.reviews.push({
      userId: validUserId,
      username,
      rating,
      description: reviewDescription,
      timestamp: new Date(),
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// fetch all the product reviews
export const getProductReviews = async (req, res) => {
  try {
    const { productId, productType } = req.params;

    if (!productId || !productType) {
      return res
        .status(404)
        .json({ success: false, message: "Product Id not found" });
    }

    // Determine which product array to use
    const productField =
      productType === "fresh" ? "freshProducts" : "thriftProducts";
    const productReviews =
      productField == "freshProducts"
        ? await freshProductsModel.findById(productId).select("reviews")
        : await thriftProductsModel.findById(productId).select("reviews");

    if (!productReviews) {
      return res
        .status(404)
        .json({ success: false, message: "Product review not found" });
    }

    res.status(200).json({
      success: true,
      reviews: productReviews.reviews,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
