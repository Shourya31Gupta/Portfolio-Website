const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create model
const Contact = mongoose.model("Contact", contactSchema);

// Route to handle form submissions
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newEntry = new Contact({ name, email, message });
    await newEntry.save();

    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Optional: health check route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
