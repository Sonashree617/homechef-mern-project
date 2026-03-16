import express from "express"
import { createOrder, verifyPayment, getMyOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// CREATE PAYMENT ORDER
router.post("/create", authMiddleware, createOrder)

// VERIFY PAYMENT
router.post("/verify", authMiddleware, verifyPayment)

router.get("/my-orders", authMiddleware, getMyOrders);
export default router