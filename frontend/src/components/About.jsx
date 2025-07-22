import React from "react";
import homeBg from "../assets/home-bg.png"; // ✅ Ensure the image exists

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen py-16 border-b border-zinc-800 text-zinc-200 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">About Me</h2>

        <p className="text-lg leading-8 mb-4">
          I'm{" "}
          <span className="font-semibold text-white">Shourya Gupta</span>, a passionate tech enthusiast pursuing a diploma in Computer Engineering.
          I specialize in blending logic and creativity to solve real-world problems with code.
        </p>

        <p className="text-lg leading-8 mb-4">
          I’m especially interested in{" "}
          <span className="text-white">Database Engineering</span> and{" "}
          <span className="text-white">Cybersecurity</span>, and have already published one research paper and also co-authored two research papers on innovative tech topics like
          Swarm Robotics and Robotics in Healthcare.
        </p>

        <p className="text-lg leading-8">
          I thrive on building futuristic, meaningful tools and aim to work globally, solving challenging tech problems that matter.
        </p>
      </div>
    </section>
  );
}
