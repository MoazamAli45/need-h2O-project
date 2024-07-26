import mongoose from "mongoose";

const waterPriceSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
  },
  townWaterPrice: {
    type: Number,
    required: true,
  },
  pureWaterPrice: {
    type: Number,
  },
});

const WaterPrice =
  mongoose.models.WaterPrice || mongoose.model("WaterPrice", waterPriceSchema);

export default WaterPrice;
