import axios from "axios";

// -------------------- BASE URL --------------------

// ✅ Use environment variable (best practice)
// Fallback to your Render URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://homechef-mern-project.onrender.com/api",
});

// -------------------- TOKEN HEADER --------------------

const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

// -------------------- INTERCEPTOR (AUTO TOKEN) --------------------

// 🔥 Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// -------------------- DISHES --------------------

export const getDishes = () => {
  return API.get("/dishes");
};

// -------------------- CART --------------------

export const addToCart = (item) => {
  return API.post("/cart/add", item);
};

export const getCart = () => {
  return API.get("/cart");
};

export const updateCartItem = (dishId, quantity) => {
  return API.post("/cart/update", { dishId, quantity });
};

export const deleteCartItem = (dishId) => {
  return API.post("/cart/remove", { dishId });
};

export const clearCart = () => {
  return API.post("/cart/clear");
};

// -------------------- ORDERS --------------------

export const createOrder = (amount) => {
  return API.post("/orders/create", { amount });
};

export const verifyPayment = (data) => {
  return API.post("/orders/verify", data);
};

export const getMyOrders = () => {
  return API.get("/orders/my-orders");
};

export default API;