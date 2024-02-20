import mongoose, { mongo } from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    maxAllowedOrders: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);
