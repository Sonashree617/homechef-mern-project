import "./FoodCard.css";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { addToCart as addToCartAPI } from "../../api";

function FoodCard({ id, image, name, chef, price, rating }) {
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const item = {
      dishId: id, // must match MongoDB _id
      quantity: 1,
      price,
    };

    try {
      setLoading(true);

      // Call backend API
      const res = await addToCartAPI(item);
      console.log("Added to cart:", res.data);

      // Update local cart context
      addToCart(item);

      alert("Added to cart 🛒");
    } catch (err) {
      console.log("ADD TO CART ERROR:", err);
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-card">
      <div className="food-image">
        <img src={image} alt={name} />
        <div className="rating">⭐ {rating}</div>
      </div>

      <div className="food-info">
        <h3>{name}</h3>
        <p className="chef">👨‍🍳 {chef}</p>
        <div className="food-bottom">
          <span className="price">₹{price}</span>
          <button onClick={handleAddToCart} disabled={loading}>
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;