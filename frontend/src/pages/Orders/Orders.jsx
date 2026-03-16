import { useEffect, useState } from "react"
import { getMyOrders } from "../../api"

function Orders(){

const [orders,setOrders] = useState([])

useEffect(()=>{

const fetchOrders = async ()=>{

try{

const res = await getMyOrders()

setOrders(res.data.orders)

}catch(err){

console.log(err)

}

}

fetchOrders()

},[])

return(

<div className="container">

<h2>My Orders</h2>

{orders.length === 0 ? (

<p>No orders yet</p>

) : (

orders.map(order=>(
<div key={order._id} className="order-card">

<h3>Order ID: {order._id}</h3>

<p>Status: {order.status}</p>

<p>Total: ₹{order.totalAmount}</p>

<ul>

{order.items.map(item=>(
<li key={item._id}>
{item.dishId?.name} x {item.quantity}
</li>
))}

</ul>

</div>
))

)}

</div>

)

}

export default Orders