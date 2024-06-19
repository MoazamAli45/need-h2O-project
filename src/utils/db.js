import Loads from "@/model/Loads";
import Settings from "@/model/Settings";
import mongoose from "mongoose";

const connect = async () => {
  try {
    //  Checking
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("error in connecting Database ");
    throw new Error(error);
  }
};

export default connect;
