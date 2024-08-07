import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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
    },
  ],
});

export default mongoose.model("Wishlist", wishlistSchema);
