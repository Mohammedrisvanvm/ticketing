import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {});
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
