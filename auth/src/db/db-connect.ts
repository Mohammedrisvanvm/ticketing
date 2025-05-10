import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
