const serverless = require("serverless-http");
const connectDB = require("../../config/mongoose.config");
const app = require("../../app");

let isConnected = false;

console.log("Netlify function cold start", new Date().toISOString());

(async () => {
  try {
    if (!isConnected) {
      console.log("➡️ Connecting to DB...");
      await connectDB();
      isConnected = true;
      console.log("✅ DB connected");
    }
  } catch (err) {
    console.error("❌ DB Connection Failed", err);
  }
})();

module.exports.handler = serverless(app);
