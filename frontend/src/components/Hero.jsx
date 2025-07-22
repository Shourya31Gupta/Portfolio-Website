import React from "react";
import homeBg from "../assets/home-bg.png"; // ✅ Ensure this file exists in src/assets/

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-start items-center text-center text-white px-4 pt-24 md:pt-36 lg:pt-40 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      {/* Overlay to darken background and apply blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-0" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm Shourya Gupta</h1>

        <p className="text-2xl text-zinc-300 font-medium mb-4">
          Crafting Scalable Solutions. <br />
          Backed by Research. <br />
          Built with Purpose.
        </p>

        <p className="text-lg text-zinc-400 max-w-xl mb-6">
          Aspiring{" "}
          <span className="text-white font-semibold">
            Database & Cybersecurity Engineer
          </span>{" "}
          with a passion for creating impactful and secure tech systems.
        </p>

        <a
          href="#projects"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition"
        >
          View My Work
        </a>
      </div>
    </section>
  );
}
