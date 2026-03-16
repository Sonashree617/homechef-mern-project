import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

const [cart, setCart] = useState([])

const addToCart = (food) => {

setCart(prev => {

const exist = prev.find(item => item.id === food.id)

if (exist) {

return prev.map(item =>
item.id === food.id
? { ...item, quantity: item.quantity + 1 }
: item
)

} else {

return [...prev, food]

}

})

}
const increaseQty = (id) => {

setCart(prev =>
prev.map(item =>
item.id === id
? { ...item, quantity: item.quantity + 1 }
: item
)
)

}

const decreaseQty = (id) => {

setCart(prev =>
prev
.map(item =>
item.id === id
? { ...item, quantity: item.quantity - 1 }
: item
)
.filter(item => item.quantity > 0)
)

}

const removeFromCart = (id) => {

setCart(prev =>
prev.filter(item => item.id !== id)
)

}

return (

<CartContext.Provider
value={{
cart,
addToCart,
increaseQty,
decreaseQty,
removeFromCart
}}
>

{children}

</CartContext.Provider>

)

}