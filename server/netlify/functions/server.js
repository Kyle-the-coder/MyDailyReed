const serverless = require("serverless-http");
const app = require("../../server/app");
const connectDB = require("../../server/config/mongoose.config");

// Export a handler that ensures DB connection
const handler = serverless(async (req, res) => {
  await connectDB();
  return app(req, res);
});

module.exports = { handler };
