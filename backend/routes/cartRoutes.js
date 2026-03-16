import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD ITEM
router.post("/add", authMiddleware, addToCart);

// GET CART
router.get("/", authMiddleware, getCart);

// UPDATE QUANTITY
router.post("/update", authMiddleware, updateQuantity);

// REMOVE ITEM
router.post("/remove", authMiddleware, removeItem);

// CLEAR CART
router.post("/clear", authMiddleware, clearCart);

export default router;