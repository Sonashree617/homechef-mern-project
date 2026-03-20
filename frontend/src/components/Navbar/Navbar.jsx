import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Navbar() {

  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // 🔥 Hide Navbar on login & register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">

      <div className="container nav-content">

        <h2 className="logo">HomeChef</h2>

        <nav className="nav-links">

          {/* ✅ Fixed Home route */}
          <Link to="/home">Home</Link>

          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {token && (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>

              {/* ✅ Show cart only when logged in */}
              <Link to="/cart" className="cart">
                🛒
                <span className="cart-count">
                  {totalItems}
                </span>
              </Link>
            </>
          )}

        </nav>

      </div>

    </header>
  );
}

export default Navbar;