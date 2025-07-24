// routes/contactRoute.js

import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

// POST route to save contact form data
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
