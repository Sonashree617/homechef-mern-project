import "./Cart.css";
import { useEffect, useState } from "react";
import { getCart, deleteCartItem, updateCartItem, createOrder, verifyPayment } from "../../api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCartItems(res.data || []); // always array
      } catch (err) {
        console.log(err);
        setCartItems([]);
      }
    };
    fetchCart();
  }, []);

  // DELETE ITEM
  const deleteItem = async (item) => {
    try {
      const res = await deleteCartItem(item.dishId);
      setCartItems(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // INCREASE QTY
  const increaseQty = async (item) => {
    const newQty = (item.quantity || 1) + 1;
    try {
      const res = await updateCartItem(item.dishId, newQty);
      setCartItems(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // DECREASE QTY
  const decreaseQty = async (item) => {
    const newQty = (item.quantity || 1) - 1;
    if (newQty <= 0) return;
    try {
      const res = await updateCartItem(item.dishId, newQty);
      setCartItems(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // TOTAL
  const total = (cartItems || []).reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  // CHECKOUT (Razorpay)
  const handleCheckout = async () => {
    try {
      const res = await createOrder(total);
      const order = res.data.order;

      const options = {
        key: "rzp_test_SOk2lluuYyHXk2",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "HomeChef",
        description: "Food Order Payment",
        handler: async function (response) {
          await verifyPayment(response);
          alert("Payment Successful 🎉");
          setCartItems([]); // clear cart after payment
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-page container section">
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image || "https://via.placeholder.com/100"} alt={item.name || "Food"} />
                <div className="cart-info">
                  <h3>{item.name || "Food Item"}</h3>
                  <p>{item.chef?.name || "Home Chef"}</p>
                </div>
                <div className="cart-actions">
                  <div className="quantity">
                    <button onClick={() => decreaseQty(item)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => increaseQty(item)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => deleteItem(item)}>Remove</button>
                </div>
                <div className="cart-price">
                  ₹{(item.price || 0) * (item.quantity || 1)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;