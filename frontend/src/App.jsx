import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Routes, Route, Navigate } from "react-router-dom";

// ---------------- Private Route ----------------
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// ---------------- Public Route ----------------
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" /> : children;
};

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Root: decide where to go */}
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/home" />
              : <Navigate to="/login" />
          }
        />

        {/* Home page - protected */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Cart page - protected */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Orders page - protected */}
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        {/* Login page - public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Register page - public */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;