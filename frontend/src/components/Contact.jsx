import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post(
        "https://portfolio-backend-44u0.onrender.com/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="p-8 max-w-3xl mx-auto text-white">
      <h2 className="text-4xl font-bold mb-6 text-center">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-6 rounded-xl">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full p-3 rounded bg-zinc-800 text-white"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
        >
          Send Message
        </button>
        {status && <p className="text-sm text-center mt-2">{status}</p>}
      </form>
    </section>
  );
}
