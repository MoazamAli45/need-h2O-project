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
        confirmAddress: String,
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
    submitted: {
      type: Boolean,
      required: true,
      default: false, // Assuming orders are initially not submitted
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
