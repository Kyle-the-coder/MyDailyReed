const serverless = require("serverless-http");
const app = require("../../app");
const connectDB = require("../../config/mongoose.config");

let isConnected = false;

const handler = serverless(async (req, res) => {
  if (!isConnected) {
    console.log("we connected");
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
});

module.exports.handler = handler;
