import express from "express";

import {
  generateOrderId,
  getPaymentInfo,
  paymentVerification,
} from "../controllers/paymentController.js";

const router = express.Router();

// generate order ID
router.post("/orderId", generateOrderId);

// payment verification
router.post("/paymentVerification", paymentVerification);

// get payment info for order
router.get("/:paymentId", getPaymentInfo);

export default router;
