const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    console.log("🧠 Connecting to DB...");
    console.log(process.env.MONGO_CONNECT);

    const conn = await mongoose.connect(process.env.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Fail fast if DB unreachable
      socketTimeoutMS: 45000, // Socket timeout
    });

    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    throw err;
  }
};

module.exports = connectDB;
