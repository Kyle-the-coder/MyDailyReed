const express = require("express");
require("dotenv").config({ path: "./.env" });
const connectDB = require("./config/mongoose.config");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

// Firebase Admin Initialization
let serviceAccount;

if (process.env.FB_CONFIG) {
  serviceAccount = JSON.parse(process.env.FB_CONFIG);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
} else {
  serviceAccount = require("./firebase-service-account.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 8000;

// CORS setup
const allowedOrigins = ["http://localhost:5173", "https://mydailyreed.web.app"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(allowedOrigins, "call");
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Route setup (NO global auth middleware here)
const blogRoutes = require("./routes/blog.routes");
app.use("/blogs", blogRoutes);

// Start server
// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//   }
// };

// startServer();

module.exports = app;
