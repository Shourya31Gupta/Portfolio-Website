import { useState } from "react";
import contactBg from "../assets/contact-bg.png"; // optional background image
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await axios.post(
        "https://portfolio-backend-44u0.onrender.com/api/contact",
        formData
      );

      if (response.status === 200) {
        setStatus("Submitted successfully!");
        setFormData({ name: "", email: "", contact: "" });
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-4 text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(${contactBg})`, // use your own image or comment this
        // backgroundColor: "#0a0a0a", // use this if you want solid background instead
      }}
    >
      <div className="w-full max-w-md bg-zinc-900 bg-opacity-90 p-8 rounded-2xl shadow-2xl border border-zinc-800">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium mb-1">
              Contact Number
            </label>
            <input
              type="tel"
              name="contact"
              id="contact"
              required
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-600 rounded-md text-white font-semibold transition duration-200"
          >
            Submit
          </button>
        </form>

        {status && (
          <p className="text-center text-sm mt-4 text-zinc-300">{status}</p>
        )}
      </div>
    </section>
  );
}
