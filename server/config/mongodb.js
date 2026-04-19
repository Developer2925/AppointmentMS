import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`, {
    serverSelectionTimeoutMS: 5000,
    family: 4, // Force IPv4
  });
};

export default connectDB;
