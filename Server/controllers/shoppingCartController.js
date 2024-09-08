import mongoose from "mongoose";

import userModel from "../models/userModel.js";
import freshProductsModel from "../models/freshProductsModel.js";
import thriftProductsModel from "../models/thriftProductsModel.js";
import shoppingCartModel from "../models/shoppingCartModel.js";

export const getShoppingCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const validUserId = await userModel.findOne({ userId: userId }, { _id: 1 });

    // Check if the shopping cart exists for the user
    const shoppingCart = await shoppingCartModel
      .findOne({ userId: validUserId })
      .populate([
        { path: "freshProducts.productId", model: freshProductsModel },
        { path: "thriftProducts.productId", model: thriftProductsModel },
      ]);

    if (!shoppingCart) {
      console.log(shoppingCart);
      return res.status(404).json({
        success: false,
        message: "Wishlist not found for this user.",
      });
    }
    res.status(200).json({
      success: true,
      shoppingCart: {
        freshProducts: shoppingCart.freshProducts,
        thriftProducts: shoppingCart.thriftProducts,
      },
    });
  } catch (error) {
    console.error("Error fetching shopping cart:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const addToShoppingCart = async (req, res) => {
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

    // Check if the shopping cart document for the user already exists
    let shoppingCart = await shoppingCartModel.findOne({ userId: validUserId });

    if (!shoppingCart) {
      // If no shopping cart exists, create a new one
      shoppingCart = new shoppingCartModel({ userId: validUserId });
    }

    // Check if the product is already in the shopping cart
    if (
      shoppingCart[productField].some(
        (item) => item.productId.toString() === validProductId._id.toString()
      )
    ) {
      return res
        .status(200)
        .json({ success: false, message: "Product already in shopping cart." });
    }

    // Add the product to the shopping cart
    shoppingCart[productField].push({
      productId: validProductId,
      addedAt: new Date(),
    });

    // Save the updated shopping cart
    await shoppingCart.save();

    res.status(200).json({
      success: true,
      message: "Product added to shopping cart successfully.",
    });
  } catch (error) {
    console.error("Error adding product to shopping cart:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const deleteFromShoppingCart = async (req, res) => {
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

    // Find the user's shopping cart
    const shoppingCart = await shoppingCartModel.findOne({
      userId: validUserId,
    });

    if (!shoppingCart) {
      return res.status(404).json({
        success: false,
        message: "shopping cart not found.",
      });
    }

    // Pull the product from the appropriate array
    let result = await shoppingCartModel.updateOne(
      { userId: validUserId },
      {
        $pull: {
          [productField]: { productId: validProductId },
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Product removed from shopping cart successfully.",
    });
  } catch (error) {
    console.error("Error removing product from shopping cart:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// set quantity
export const setProductQuantityAndPrice = async (req, res) => {
  try {
    const { userId, productId, productType, quantity } = req.body;

    if ((!userId, !productId, !productType, !quantity)) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    const validUserId = await userModel.findOne({ userId: userId }, { _id: 1 });
    // console.log(userId);

    // Find the product by ID and update its quantity
    const shoppingCart = await shoppingCartModel.findOne({
      userId: validUserId,
    });

    if (!shoppingCart) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }
    let productUpdated = false;

    if (productType == "fresh") {
      const product = shoppingCart.freshProducts.find(
        (item) => item.productId.toString() === productId
      );

      if (product) {
        product.quantity = quantity;
        productUpdated = true;
      }
    } else if (productType == "thrift") {
      const product = shoppingCart.thriftProducts.find(
        (item) => item.productId.toString() === productId
      );

      if (product) {
        product.quantity = quantity;
        productUpdated = true;
      }
    }

    if (!productUpdated) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the specified category.",
      });
    }

    await shoppingCart.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
