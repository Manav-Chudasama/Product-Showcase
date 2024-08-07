import mongoose from "mongoose";

const shoppingCartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  freshProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "freshProducts",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  thriftProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "thriftProducts",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("shoppingcart", shoppingCartSchema);
