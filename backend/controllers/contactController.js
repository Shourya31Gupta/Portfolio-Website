// controllers/contactController.js

exports.handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("Contact form submission:", { name, email, message });

    // You can also store in MongoDB or Firebase here if needed.

    res.status(200).json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).json({ error: "Server error" });
  }
};
