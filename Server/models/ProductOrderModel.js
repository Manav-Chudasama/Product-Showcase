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
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
      },
      productType: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
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
