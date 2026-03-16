import Cart from "../models/Cart.js";
import Dish from "../models/Dish.js";

// ADD ITEM TO CART
export const addToCart = async (req, res) => {
    try {
        const { dishId, quantity } = req.body;
        console.log("REQ.USER:", req.user);
        console.log("REQ.BODY:", req.body);

        if (!dishId || !quantity) {
            return res.status(400).json({ error: "dishId and quantity required" });
        }

        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(
            (item) => item.dishId.toString() === dishId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ dishId, quantity });
        }

        await cart.save();

        // Populate dish info
        const populatedCart = await cart.populate("items.dishId");

        const items = populatedCart.items.map((item) => ({
            _id: item._id,
            dishId: item.dishId._id,
            name: item.dishId.name,
            image: item.dishId.image,
            price: item.dishId.price,
            quantity: item.quantity,
            chef: item.dishId.chef || "Home Chef",
        }));

        res.json(items);
    } catch (error) {
        console.log("ADD TO CART ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

// ----------------- GET USER CART -----------------
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate("items.dishId");

        if (!cart) return res.json([]); // empty array if no cart

        const items = cart.items.map(item => ({
            _id: item._id,
            dishId: item.dishId._id,
            name: item.dishId.name,
            image: item.dishId.image,
            price: item.dishId.price,
            quantity: item.quantity
        }));

        res.json(items);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// ----------------- UPDATE QUANTITY -----------------
export const updateQuantity = async (req, res) => {
    try {
        const { dishId, quantity } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item => item.dishId.toString() === dishId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.quantity = quantity;

        await cart.save();

        const populatedCart = await cart.populate("items.dishId");
        const items = populatedCart.items.map(item => ({
            _id: item._id,
            dishId: item.dishId._id,
            name: item.dishId.name,
            image: item.dishId.image,
            price: item.dishId.price,
            quantity: item.quantity
        }));

        res.json(items);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// ----------------- REMOVE ITEM -----------------
export const removeItem = async (req, res) => {
    try {
        const { dishId } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.dishId.toString() !== dishId);
        await cart.save();

        const populatedCart = await cart.populate("items.dishId");
        const items = populatedCart.items.map(item => ({
            _id: item._id,
            dishId: item.dishId._id,
            name: item.dishId.name,
            image: item.dishId.image,
            price: item.dishId.price,
            quantity: item.quantity
        }));

        res.json(items);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// ----------------- CLEAR CART -----------------
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = [];
        await cart.save();

        res.json({ message: "Cart cleared" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};