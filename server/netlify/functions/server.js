const serverless = require("serverless-http");
const connectDB = require("../../config/mongoose.config");
const app = require("../../app");

console.log("Netlify function cold start", new Date().toISOString());

module.exports.handler = serverless(async (req, res) => {
  await connectDB();
  return app(req, res);
});
