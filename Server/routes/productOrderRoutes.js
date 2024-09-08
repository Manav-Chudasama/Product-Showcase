import express from "express";
import {
  createProductOrder,
  getAllProductOrders,
} from "../controllers/productOrderController.js";

const router = express.Router();

// Create a new product order
router.post("/createProductOrder", createProductOrder);

// get all product orders
router.get("/getAllProductOrders", getAllProductOrders);

export default router;
