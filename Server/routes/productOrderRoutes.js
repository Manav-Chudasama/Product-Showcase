import express from "express";
import { createProductOrder } from "../controllers/productOrderController.js";

const router = express.Router();

router.post("/createProductOrder", createProductOrder);

export default router;
