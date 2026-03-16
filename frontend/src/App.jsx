import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Home from "./pages/Home/Home"
import Orders from "./pages/Orders/Orders"
import Cart from "./pages/Cart/Cart"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { Routes, Route } from "react-router-dom"
import "./setToken.js";

function App() {

  return (

    <>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>

      <Footer />

    </>

  )

}

export default App