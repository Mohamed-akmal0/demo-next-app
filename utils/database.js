import mongoose from "mongoose";

let isConnected = false;

export const dbConnection = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("db connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "DemoNext",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("db connected");
  } catch (error) {
    console.log("error in db connection", error);
  }
};
