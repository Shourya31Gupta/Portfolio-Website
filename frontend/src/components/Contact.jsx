import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import contactBg from "../assets/contact-bg.png"; // Background image

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit. Please try again.");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 py-20 text-white bg-cover bg-center relative"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <h2 className="text-4xl font-bold">GET IN TOUCH</h2>

        <div className="text-lg text-zinc-300 space-y-1 font-mono">
          <p>Email: shourya31gupta@gmail.com</p>
          <p>Phone: +91 9096700193</p>
          <p>Location: Mumbai, India</p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-10 text-3xl">
          <a
            href="https://github.com/Shourya31Gupta"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/shourya-g"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:shourya31gupta@gmail.com"
            className="hover:text-pink-400 transition"
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg p-6 md:p-8 rounded-xl space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-2 bg-white/10 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.message}
            onChange={handleChange}
            required
          />

          {submitted && (
            <p className="text-green-400 text-sm">Submitted! Thank you 🙂</p>
          )}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
