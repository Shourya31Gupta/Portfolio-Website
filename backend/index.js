import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoute from "./routes/contactRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use CORS with Vercel origin
app.use(cors({
  origin: "https://portfolio-website-shouryas-projects-6a2c0b12.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Use the contact route
app.use("/api/contact", contactRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
