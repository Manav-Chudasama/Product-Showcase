import mongoose from "mongoose";

import userModel from "../models/userModel.js";
import freshProductsModel from "../models/freshProductsModel.js";
import thriftProductsModel from "../models/thriftProductsModel.js";
import Wishlist from "../models/wishlistModel.js";

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const validUserId = await userModel.findOne({ userId: userId }, { _id: 1 });

    // Check if the wishlist exists for the user
    const wishlist = await Wishlist.findOne({ userId: validUserId }).populate([
      { path: "freshProducts.productId", model: freshProductsModel },
      { path: "thriftProducts.productId", model: thriftProductsModel },
    ]);

    if (!wishlist) {
      console.log(wishlist);
      return res.status(404).json({
        success: false,
        message: "Wishlist not found for this user.",
      });
    }
    res.status(200).json({
      success: true,
      wishlist: {
        freshProducts: wishlist.freshProducts,
        thriftProducts: wishlist.thriftProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId, productType } = req.body;

    if (!userId || !productId || !productType) {
      return res.status(400).json({
        success: false,
        message: "User ID, product ID, and product type are required.",
      });
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

    // Check if the wishlist document for the user already exists
    let wishlist = await Wishlist.findOne({ userId: validUserId });

    if (!wishlist) {
      // If no wishlist exists, create a new one
      wishlist = new Wishlist({ userId: validUserId });
    }

    // Check if the product is already in the wishlist
    if (
      wishlist[productField].some(
        (item) => item.productId.toString() === validProductId
      )
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Product already in wishlist." });
    }

    // Add the product to the wishlist
    wishlist[productField].push({
      productId: validProductId,
      addedAt: new Date(),
    });

    // Save the updated wishlist
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist successfully.",
    });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const deleteFromWishlist = async (req, res) => {
  try {
    const { userId, productId, productType } = req.body;
    // console.log(userId, productId, productType);

    if (!userId || !productId || !productType) {
      return res.status(400).json({
        success: false,
        message: "User ID, product ID, and product type are required.",
      });
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

    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({
      userId: validUserId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found.",
      });
    }

    // Pull the product from the appropriate array
    await Wishlist.updateOne(
      { userId: validUserId },
      {
        $pull: {
          [productField]: { productId: validProductId },
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist successfully.",
    });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
