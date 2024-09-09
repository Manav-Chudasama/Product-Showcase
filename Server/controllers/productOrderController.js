import mongoose from "mongoose";
import ProductOrderModel from "../models/ProductOrderModel.js";
import { deleteAfterProductOrder } from "./shoppingCartController.js";

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
      subTotal,
      shippingCost,
      taxRate,
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
      !subTotal,
      !shippingCost,
      !taxRate,
      !totalAmount)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Combinig the freshProducts and thriftProducts into a single array for storage
    const allProducts = [
      ...products.freshProducts.map((product) => ({
        productId: product.productId._id,
        productTitle: product.productId.title,
        productType: "fresh",
        quantity: product.quantity,
        price: Number(product.productId.price) * Number(product.quantity),
      })),
      ...products.thriftProducts.map((product) => ({
        productId: product.productId._id,
        productTitle: product.productId.title,
        productType: "thrift",
        quantity: product.quantity,
        price: Number(product.productId.price) * Number(product.quantity),
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
      subTotal,
      shippingCost,
      taxRate,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    if (!(await deleteAfterProductOrder(userId))) {
      res.status(400).json({
        success: false,
        message: "Error Emptying Shopping Cart",
      });
    }

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

export const getAllProductOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await ProductOrderModel.find({ userId: userId });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching Product Orders",
      error: error.message,
    });
  }
};
