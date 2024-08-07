import express from "express";

import {
  addToWishlist,
  getWishlist,
  deleteFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// Route to add a product to the wishlist
router.post("/add-to-wishlist", addToWishlist);

// Route to fetch products from the wishlist
router.get("/get-wishlist/:userId", getWishlist);

// Route to delete products from the wishlist
router.post("/delete-from-wishlist", deleteFromWishlist);

export default router;
