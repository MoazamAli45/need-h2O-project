import mongoose from "mongoose";

const waterTypeSchema = new mongoose.Schema(
  {
    townWater: {
      type: Boolean,
      default: true,
    },
    pureWater: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.WaterType ||
  mongoose.model("WaterType", waterTypeSchema);
