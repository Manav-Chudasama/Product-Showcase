import express from "express";
import {
  createProductOrder,
  getAllProductOrders,
  getUserProductOrders,
} from "../controllers/productOrderController.js";

const router = express.Router();

// get all products orders
router.get("/", getAllProductOrders);

// Create a new product order
router.post("/createProductOrder", createProductOrder);

// get all user product orders
router.get("/getAllProductOrders/:userId", getUserProductOrders);

export default router;
