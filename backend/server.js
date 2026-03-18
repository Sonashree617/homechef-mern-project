import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

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
import Dish from "./models/Dish.js";

app.get("/seed", async (req, res) => {

  const dishes = [
    { name: "Paneer Butter Masala", description: "Creamy paneer curry", price: 250 },
    { name: "Veg Biryani", description: "Spicy rice dish", price: 200 },
    { name: "Masala Dosa", description: "South Indian dosa", price: 120 }
  ];

  await Dish.insertMany(dishes);

  res.send("Dishes added");
});
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ---------------- TEST ROUTE ----------------

app.get("/", (req, res) => {
  res.send("HomeChef Marketplace API Running 🚀");
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});