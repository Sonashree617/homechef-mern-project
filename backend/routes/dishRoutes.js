import express from "express";
import {
  addDish,
  getAllDishes,
  getDishById,
  updateDish,
  deleteDish
} from "../controllers/dishController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create dish (chef only)
router.post("/add", authMiddleware, upload.single("image"), addDish);

// Get all dishes
router.get("/", getAllDishes);

// Get single dish
router.get("/:id", getDishById);

// Update dish
router.put("/:id", authMiddleware, upload.single("image"), updateDish);

// Delete dish
router.delete("/:id", authMiddleware, deleteDish);

export default router;