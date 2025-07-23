import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");

    try {
      await axios.post(
        "https://portfolio-backend-44u0.onrender.com/api/contact",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("❌ Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="text-white p-8" id="contact">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md bg-zinc-900 p-6 rounded-xl shadow-lg"
      >
        <label className="block">
          <span className="text-sm text-zinc-400">Your Name</span>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-zinc-400">Your Email</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-800 text-white rounded outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-zinc-400">Your Message</span>
          <textarea
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full mt-1 p-2 bg-gray-800 text-white rounded resize-none outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {status && <p className="text-sm mt-2 text-center">{status}</p>}
      </form>
    </section>
  );
}
