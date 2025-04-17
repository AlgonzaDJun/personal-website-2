import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_LOCAL = process.env.MONGO_LOCAL;
  if (!MONGO_LOCAL) {
    throw new Error("MongoDB connection string is not defined");
  }
  try {
    await mongoose.connect(MONGO_LOCAL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
