import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    profile: {
      type: {
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        distanceFromTank: String,
        tankLocation: String,
        deliveryTime: String,
        comments: String,
        driveaway: [String],
      },
      required: true,
    },
    details: {
      type: {
        // Define the structure for details
        city: String,
        townWaterPrice: Number,
        pureWaterPrice: Number,
      },
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now, // Set default value to current date/time
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
