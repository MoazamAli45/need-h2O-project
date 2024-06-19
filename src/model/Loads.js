import mongoose from "mongoose";

const loadsSchema = new mongoose.Schema(
  {
    maxAllowedLoads: {
      type: Number,
      required: true,
      default: 2,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Loads || mongoose.model("Loads", loadsSchema);
