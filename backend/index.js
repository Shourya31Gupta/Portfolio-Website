import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoute from "./routes/contactRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Enable all origins for testing
app.use(
  cors({
    origin: "*", // For testing — change this to your frontend URL after confirming it's working
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// Routes
app.use("/api/contact", contactRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
