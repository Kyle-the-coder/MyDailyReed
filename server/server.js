const express = require("express");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./config/mongoose.config");
const cors = require("cors");

const app = express();
const port = 8000;

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || port,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Routes
const blogRoutes = require("./routes/blog.routes");
app.use("/api/blogs", blogRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
