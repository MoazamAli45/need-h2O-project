import mongoose from "mongoose";

const connect = async () => {
  try {
    //  Checking
    console.log("Connecting to MongoDB");
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("error in connecting Database ");
    throw new Error(error);
  }
};

export default connect;
