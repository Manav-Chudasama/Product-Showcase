import express from "express";
import {
  createReview,
  getProductReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create a new review for a product
router.post("/create-review", createReview);

// fetch the product reviews
router.get("/get-product-reviews/:productId/:productType", getProductReviews);

export default router;
