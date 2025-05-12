const express = require("express");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

const blogRoutes = require("./routes/blog.routes");

let serviceAccount;

if (process.env.FB_CONFIG) {
  serviceAccount = JSON.parse(process.env.FB_CONFIG);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
} else {
  console.error("FB_Config is missing");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8888",
  "https://mydailyreed.web.app",
  "https://mydailyreed.netlify.app",
];
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

// Mount normal routes (no Netlify prefix here)
app.use("/blogs", blogRoutes);

module.exports = app;
