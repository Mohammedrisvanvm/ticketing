import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {});
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
