const serverless = require("serverless-http");
const express = require("express");
const connectDB = require("../../config/mongoose.config");
const app = express();
const coreApp = require("../../app");

// Mount the core app at the Netlify Functions path
app.use("/.netlify/functions/server", coreApp);

// Wrap with serverless and ensure DB connects
module.exports.handler = serverless(async (req, res) => {
  await connectDB();
  return app(req, res);
});
