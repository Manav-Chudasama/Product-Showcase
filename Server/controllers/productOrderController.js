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
      products, // containing freshProducts and thriftProducts arrays
      totalAmount,
    } = req.body;

    // console.log(req.body.products.freshProducts);

    // Combinig the freshProducts and thriftProducts into a single array for storage
    const allProducts = [
      ...products.freshProducts.map((product) => ({
        productId: product.productId._id,
        productType: "fresh",
        quantity: product.quantity,
        price: product.productId.price,
      })),
      ...products.thriftProducts.map((product) => ({
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
