import express from "express";

import {
  addToShoppingCart,
  getShoppingCart,
  deleteFromShoppingCart,
  setProductQuantityAndPrice,
} from "../controllers/shoppingCartController.js";

const router = express.Router();

// Route to add a product to the shopping cart
router.post("/add-to-shopping-cart", addToShoppingCart);

// Route to fetch all the products from the shopping cart
router.get("/get-shopping-cart/:userId", getShoppingCart);

// Route to delete a products from the shopping cart
router.post("/delete-from-shopping-cart", deleteFromShoppingCart);

//Update Product Quantity
router.post("/update-Product-quantity-and-price", setProductQuantityAndPrice);

export default router;
