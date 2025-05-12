const serverless = require("serverless-http");
const connectDB = require("../../config/mongoose.config");
const app = require("../../app");

console.log("Netlify function cold start", new Date().toISOString());

module.exports.handler = serverless(async (req, res) => {
  console.log("➡️ Netlify Function Invoked");
  try {
    await connectDB();
    console.log("✅ DB connected");
    return app(req, res);
  } catch (err) {
    console.error("❌ Server crashed", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
});
