// index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoute from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for your frontend (Vercel deployment)
app.use(
  cors({
    origin: "https://portfolio-website-shouryas-projects-6a2c0b12.vercel.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Route for contact form
app.use("/api/contact", contactRoute);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
