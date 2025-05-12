const serverless = require("serverless-http");
const app = require("../../app");
const connectDB = require("../../config/mongoose.config");

// Export a handler that ensures DB connection
const handler = serverless(async (req, res) => {
  await connectDB();
  return app(req, res);
});

module.exports = { handler };
