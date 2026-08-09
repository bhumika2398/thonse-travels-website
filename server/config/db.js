import mongoose from "mongoose";

let dbConnected = false;

/**
 * Whether Mongoose currently has a live MongoDB connection.
 * Controllers use this to decide between the Mongo-backed models
 * and the local JSON file fallback.
 */
export const isDbConnected = () => dbConnected;

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log(
      "[db] No MONGO_URI set — running on local JSON file storage fallback."
    );
    dbConnected = false;
    return false;
  }

  try {
    await mongoose.connect(uri);
    dbConnected = true;
    console.log("[db] MongoDB connected successfully.");

    mongoose.connection.on("disconnected", () => {
      console.warn("[db] MongoDB disconnected — falling back to JSON storage.");
      dbConnected = false;
    });

    return true;
  } catch (err) {
    console.error(
      `[db] MongoDB connection failed (${err.message}) — falling back to local JSON storage.`
    );
    dbConnected = false;
    return false;
  }
}
