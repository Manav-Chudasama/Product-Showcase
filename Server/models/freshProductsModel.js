import mongoose from "mongoose";
import reviewSchema from "./reviewModel.js";

// Define the product schema
const freshProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  images: {
    type: [String], // Array of image URLs
    validate: [arrayLimit, "Maximum of 3 images allowed"],
  },
  price: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
  },
  reviews: [reviewSchema], // Embed the review schema
});

// Custom validator to ensure only 3 images are allowed
function arrayLimit(val) {
  return val.length <= 3;
}

// Create the product model
export default mongoose.model("freshPoducts", freshProductSchema);
