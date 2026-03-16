import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      dishId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dish",
        required: true
      },

      quantity: {
        type: Number,
        default: 1
      },

      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentId: {
    type: String
  },

  status: {
    type: String,
    enum: ["Pending", "Paid", "Preparing", "Delivered"],
    default: "Pending"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);