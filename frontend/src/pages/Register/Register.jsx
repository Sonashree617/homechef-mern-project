import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../../api"
import "./Register.css"

function Register(){

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)

const navigate = useNavigate()

const handleRegister = async (e)=>{

e.preventDefault()

try{

setLoading(true)
await API.post("/api/auth/register", {
  name,
  email,
  password
});

alert("Registration successful 🎉 Please login")

navigate("/login")

}catch(err){

console.log(err)
alert("Registration failed")

}finally{

setLoading(false)

}

}

return(

<div className="register-container">

<div className="register-card">

<h2>Create Account</h2>

<p className="subtitle">
Join HomeChef Marketplace
</p>

<form onSubmit={handleRegister}>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit" disabled={loading}>
{loading ? "Creating..." : "Register"}
</button>

</form>

<p className="login-link">
Already have an account? <Link to="/login">Login</Link>
</p>

</div>

</div>

)

}

export default Register