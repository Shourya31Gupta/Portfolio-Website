const express = require("express");
const router = express.Router();
const Contact = require("../models/contact"); // MongoDB Mongoose model

// 🔥 Firebase Setup
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Initialize Firebase Admin SDK only once
const firebaseApp = initializeApp({
  credential: applicationDefault(), // or use serviceAccountKey
});
const firestore = getFirestore(firebaseApp);

// -------------------- POST: Save Contact Form --------------------
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ Save to MongoDB
    const mongoEntry = await Contact.create({ name, email, message });

    // ✅ Save to Firebase
    await firestore.collection("contacts").add({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    res.status(201).json({ success: true, data: mongoEntry });
  } catch (err) {
    console.error("Error saving contact data:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// -------------------- GET: View All Messages --------------------
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
