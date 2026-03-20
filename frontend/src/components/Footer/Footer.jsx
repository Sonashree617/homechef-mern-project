import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {

  const location = useLocation();

  // 🔥 Hide Footer on login & register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>© 2026 HomeChef. All rights reserved.</p>
        <p>
          Follow us on 
          <a href="#"> Instagram </a> | 
          <a href="#"> Facebook </a> | 
          <a href="#"> Twitter </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;