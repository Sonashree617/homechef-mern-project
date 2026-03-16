import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
{
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String },

  chef: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{ timestamps: true }
);

export default mongoose.model("Dish", dishSchema);