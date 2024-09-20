import mongoose from "mongoose";
import { NextRequest } from "next/server";
const connectToDB = async () => {
  const mongoURL = process.env.MONGO_URL;
  if (!mongoURL) {
    return NextRequest.json({
      success: false,
      error: "No database url provided",
    });
  }
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Failed to connect to database", err));
};
export default connectToDB;
