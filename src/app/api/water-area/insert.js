import WaterPrice from "@/model/WaterPrice";
import connect from "@/utils/db";

export const insertWaterPrices = async (waterPriceData) => {
  await connect();

  try {
    await WaterPrice.insertMany(waterPriceData);
    console.log("Water prices inserted successfully");
  } catch (error) {
    console.error("Error inserting water prices:", error);
    throw new Error(error);
  }
};
