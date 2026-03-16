import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
function Navbar(){

const { cart } = useContext(CartContext)
const navigate = useNavigate()

const token = localStorage.getItem("token")

const totalItems = cart.reduce(
(sum,item)=> sum + item.quantity,
0
)

const handleLogout = () =>{

localStorage.removeItem("token")

navigate("/login")

}

return(

<header className="navbar">

<div className="container nav-content">

<h2 className="logo">HomeChef</h2>

<nav className="nav-links">

<Link to="/">Home</Link>

{!token && (
<>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
</>
)}

{token && (
<button className="logout-btn" onClick={handleLogout}>
Logout
</button>
)}

<Link to="/cart" className="cart">

🛒

<span className="cart-count">
{totalItems}
</span>

</Link>

</nav>

</div>

</header>

)

}

export default Navbar