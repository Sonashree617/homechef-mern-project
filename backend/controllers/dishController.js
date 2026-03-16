  import Dish from "../models/Dish.js";

  // Add dish
  export const addDish = async (req, res) => {
    try {

      const { name, description, price } = req.body;

      const image = req.file ? req.file.path : "";

      const dish = new Dish({
        name,
        description,
        price,
        image,
        chef: req.user.id
      });

      const savedDish = await dish.save();

      res.status(201).json(savedDish);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get all dishes
  export const getAllDishes = async (req, res) => {
    try {

      const dishes = await Dish.find().populate("chef", "name email");

      res.json(dishes);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get single dish
  export const getDishById = async (req, res) => {
    try {

      const dish = await Dish.findById(req.params.id);

      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      res.json(dish);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update dish
  export const updateDish = async (req, res) => {
    try {

      const dish = await Dish.findById(req.params.id);

      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      const { name, description, price } = req.body;

      dish.name = name || dish.name;
      dish.description = description || dish.description;
      dish.price = price || dish.price;

      if (req.file) {
        dish.image = req.file.path;
      }

      const updatedDish = await dish.save();

      res.json(updatedDish);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Delete dish
  export const deleteDish = async (req, res) => {
    try {

      const dish = await Dish.findById(req.params.id);

      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }

      await dish.deleteOne();

      res.json({ message: "Dish removed" });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };