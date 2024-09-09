import mongoose from "mongoose";

const productOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    trim: true,
  },
  paymentId: {
    type: String,
    required: true,
    trim: true,
  },
  signature: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
      },
      productTitle: { type: String, required: true },
      productType: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  subTotal: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
  },
  taxRate: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("productOrder", productOrderSchema);
