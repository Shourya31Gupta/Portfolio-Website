const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 🔥 Firebase Admin SDK
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Initialize Firebase Admin
initializeApp({
  credential: applicationDefault(), // or use service account JSON (for production)
});
const firestore = getFirestore();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- MONGODB CONNECTION --------------------
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// -------------------- SCHEMA & MODEL --------------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Contact = mongoose.model("Contact", contactSchema);

// -------------------- POST: SAVE FORM ENTRY --------------------
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ Save to MongoDB
    const mongoEntry = new Contact({ name, email, message });
    await mongoEntry.save();

    // ✅ Also save to Firebase
    await firestore.collection("contacts").add({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------- GET: VIEW ALL CONTACTS --------------------
app.get("/api/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------- HEALTH CHECK --------------------
app.get("/", (req, res) => {
  res.send("🚀 Backend running...");
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
