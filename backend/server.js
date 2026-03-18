import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import Dish from "./models/Dish.js";

const app = express();

// ---------------- DATABASE ----------------
connectDB();

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: "https://homechef-mern-project-pfye-ctlankcxu-sonas-projects-9fce1112.vercel.app",
  credentials: true
}));

app.use(express.json());

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/dishes", dishRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ---------------- DEBUG ROUTE ----------------
app.get("/test-dishes", async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// ---------------- SEED ROUTE ----------------
app.get("/seed", async (req, res) => {
  try {

    const dishes = [
      { name: "Paneer Butter Masala", description: "Creamy paneer curry", price: 250, category: "Indian" },
      { name: "Veg Biryani", description: "Spicy rice with vegetables", price: 200, category: "Rice" },
      { name: "Masala Dosa", description: "South Indian dosa with potato filling", price: 120, category: "Breakfast" }
    ];

    await Dish.insertMany(dishes);

    res.send("Seed data added successfully");

  } catch (error) {
    res.status(500).send(error.message);
  }
});

// ---------------- TEST ROUTE ----------------
app.get("/", (req, res) => {
  res.send("HomeChef Marketplace API Running 🚀");
});

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});