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
const allowedOrigins = [
  "https://homechef-mern-project-k8qc-95fs2lmug-sonas-projects-9fce1112.vercel.app",
  "https://homechef-mern-project-k8qc-dss9v7v6i-sonas-projects-9fce1112.vercel.app" // ✅ ADD THIS (your current URL)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: This origin is not allowed"));
    }
  },
  credentials: true
}));

app.use(express.json());

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/dishes", dishRoutes);
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