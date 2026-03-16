import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";


// CREATE RAZORPAY ORDER
export const createOrder = async (req, res) => {

  try {

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {

    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order"
    });

  }

};
export const getMyOrders = async (req, res) => {

try {

const orders = await Order.find({ userId: req.user.id })
.populate("items.dishId")

.sort({ createdAt: -1 })

res.status(200).json({
success: true,
orders
})

} catch (error) {

console.error("Fetch Orders Error:", error)

res.status(500).json({
success: false,
message: "Failed to fetch orders"
})

}

}

// VERIFY PAYMENT + SAVE ORDER
export const verifyPayment = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      totalAmount
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      // Save order to database
      const newOrder = new Order({
        userId: req.user.id,
        items,
        totalAmount,
        paymentId: razorpay_payment_id,
        status: "Paid"
      });

      await newOrder.save();

      res.status(200).json({
        success: true,
        message: "Payment Verified & Order Saved"
      });

    } else {

      res.status(400).json({
        success: false,
        message: "Invalid Payment Signature"
      });

    }

  } catch (error) {

    console.error("Verify Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Payment verification failed"
    });

  }

};