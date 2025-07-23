// backend/index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactRoute from "./routes/contactRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Allow specific frontend origin
app.use(
  cors({
    origin: "https://portfolio-website-shouryas-projects-6a2c0b12.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use("/api/contact", contactRoute);

// DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
