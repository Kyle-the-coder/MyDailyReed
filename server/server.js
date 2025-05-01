const express = require("express");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./config/mongoose.config");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 8000;

const corsOptions = {
  origin: process.env.CORS_ALLOWED_ORIGIN || port,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const idToken = authHeader.split(" ")[1];
  const allowedEmail = process.env.FB_EMAIL;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken.email !== allowedEmail) {
      return res.status(403).json({ message: "Unauthorized email" });
    }

    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};

// Routes
const blogRoutes = require("./routes/blog.routes");
app.use("/api/blogs", authenticate, blogRoutes); // 🔐 Protect all blog routes

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
