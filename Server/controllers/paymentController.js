import Razorpay from "razorpay";
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils.js";

export const generateOrderId = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const razorpay = new Razorpay({
      key_id: process.env.TEST_KEY,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount,
      currency,
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    console.log(order);

    res.json({
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const paymentVerification = (req, res) => {
  console.log(req.body);

  const { payment_id, order_id, signature } = req.body;

  try {
    const razorpay = new Razorpay({
      key_id: process.env.TEST_KEY,
      key_secret: process.env.KEY_SECRET,
    });

    const isValid = validatePaymentVerification(
      { order_id: order_id, payment_id: payment_id },
      signature,
      process.env.KEY_SECRET
    );

    if (isValid) {
      console.log("Payment verification successfull");

      res
        .status(200)
        .json({
          success: true,
          message: "Payment verified successfully.",
          payment_id,
          order_id,
          signature,
        });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature. Payment verification failed.",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getPaymentInfo = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const razorpay = new Razorpay({
      key_id: process.env.TEST_KEY,
      key_secret: process.env.KEY_SECRET,
    });

    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      res
        .status(404)
        .json({ success: false, message: "Error Finding Payment" });
    }

    res.status(200).json({
      success: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
