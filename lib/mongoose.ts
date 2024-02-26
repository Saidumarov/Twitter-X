import mongoose, { ConnectOptions } from "mongoose";

let isConnected: boolean = false;

export const ConnetToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URL) {
    return console.log("404 mongo db");
  }
  if (isConnected) {
    return;
  }
  try {
    const options: ConnectOptions = {
      dbName: "twitter-x",
      autoCreate: true,
    };
    await mongoose.connect(process.env.MONGO_URL, options);
    isConnected = true;
    console.log("Connected to Dadabases");
  } catch (error) {
    console.log("Error connactet to  databases");
  }
};
