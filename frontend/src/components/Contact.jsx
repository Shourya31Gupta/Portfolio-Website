import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // New field
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("/api/contact", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="min-h-[70vh] flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-2xl shadow-md w-full max-w-lg border border-zinc-700"
      >
        <h2 className="text-3xl font-bold mb-4 text-white">Contact Me</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        />

        {/* Phone Number */}
        <input
          type="tel"
          name="phone"
          placeholder="Your Contact Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
        >
          Submit
        </button>

        {/* Status Message */}
        {status && (
          <p className="mt-4 text-center text-sm text-zinc-300">{status}</p>
        )}
      </form>
    </section>
  );
}
