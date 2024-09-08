import mongoose from "mongoose";
import ProductOrderModel from "../models/ProductOrderModel.js";

export const createProductOrder = async (req, res) => {
  try {
    const {
      payment_id,
      order_id,
      signature,
      userId,
      username,
      email,
      phone,
      products, // containing freshProducts and thriftProducts arrays
      totalAmount,
    } = req.body;

    if (
      (!payment_id,
      !order_id,
      !signature,
      !userId,
      !username,
      !email,
      !phone,
      !products,
      !totalAmount)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Combinig the freshProducts and thriftProducts into a single array for storage
    const allProducts = [
      ...products[0].freshProducts.map((product) => ({
        productId: product.productId._id,
        productType: "fresh",
        quantity: product.quantity,
        price: product.productId.price,
      })),
      ...products[0].thriftProducts.map((product) => ({
        productId: product.productId._id,
        productType: "thrift",
        quantity: product.quantity,
        price: product.productId.price,
      })),
    ];

    // Create a new order document
    const newOrder = new ProductOrderModel({
      orderId: order_id,
      paymentId: payment_id,
      signature,
      userId,
      username,
      email,
      phone,
      products: allProducts,
      totalAmount,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
