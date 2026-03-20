import axios from "axios";

// API BASE URL WITH /api PREFIX
const API = axios.create({
  baseURL: "https://homechef-mern-project.onrender.com/api" // <--- add /api
});

// -------------------- TOKEN HEADER --------------------
const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

// -------------------- AUTH --------------------
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// -------------------- DISHES --------------------
export const getDishes = () => {
  return API.get("/dishes");
};

// -------------------- CART --------------------
export const addToCart = (item) => {
  return API.post("/cart/add", item, { headers: getTokenHeader() });
};

export const getCart = () => {
  return API.get("/cart", { headers: getTokenHeader() });
};

export const updateCartItem = (dishId, quantity) => {
  return API.post(
    "/cart/update",
    { dishId, quantity },
    { headers: getTokenHeader() }
  );
};

export const deleteCartItem = (dishId) => {
  return API.post(
    "/cart/remove",
    { dishId },
    { headers: getTokenHeader() }
  );
};

export const clearCart = () => {
  return API.post("/cart/clear", {}, { headers: getTokenHeader() });
};

// -------------------- ORDERS --------------------
export const createOrder = (amount) => {
  return API.post("/orders/create", { amount }, { headers: getTokenHeader() });
};

export const verifyPayment = (data) => {
  return API.post("/orders/verify", data, { headers: getTokenHeader() });
};

export const getMyOrders = () => {
  return API.get("/orders/my-orders", { headers: getTokenHeader() });
};

export default API;