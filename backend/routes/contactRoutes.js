import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    await Contact.create({ name, email, message });
    return res.status(200).json({ message: "Message sent!" });
  } catch (err) {
    console.error("Error saving contact:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
