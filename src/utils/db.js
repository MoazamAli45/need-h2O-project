import Settings from "@/model/Settings";
import mongoose from "mongoose";

const connect = async () => {
  try {
    //  Checking
    await mongoose.connect(process.env.MONGODB_URI);

    // Check if there are no settings documents in the database
    const existingSettings = await Settings.findOne();
    if (!existingSettings) {
      // Create a new settings document with default values
      await Settings.create({ maxAllowedOrders: 5 });
      console.log("Default settings document created successfully.");
    }
  } catch (error) {
    console.log("error in connecting Database ");
    throw new Error(error);
  }
};

export default connect;
