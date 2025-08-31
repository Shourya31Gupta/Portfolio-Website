import React from "react";
import homeBg from "../assets/home-bg.png";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-start items-center text-center text-white px-4 pt-24 md:pt-36 lg:pt-40 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      {/* Simple background overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      {/* Minimal floating elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-1 h-1 bg-blue-400 rounded-full animate-float opacity-40"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-float opacity-60" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Simple profile image */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="text-2xl font-bold gradient-text">SG</span>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
          Hi, I'm{" "}
          <span className="gradient-text">Shourya Gupta</span>
        </h1>

        {/* Subtitle */}
        <div className="mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-zinc-100">
            Crafting{" "}
            <span className="text-blue-400">Scalable Solutions</span>
          </p>
          <p className="text-xl md:text-2xl font-medium mb-2 text-zinc-200">
            Backed by{" "}
            <span className="text-cyan-400">Research</span>
          </p>
          <p className="text-xl md:text-2xl font-medium text-zinc-200">
            Built with{" "}
            <span className="text-purple-400">Purpose</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          Aspiring{" "}
          <span className="font-semibold text-white">
            Database & Cybersecurity Engineer
          </span>{" "}
          with a passion for creating impactful and secure tech systems.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
          <a
            href="#projects"
            className="btn-primary"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-secondary"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center items-center space-x-6 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <a
            href="https://github.com/Shourya31Gupta"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-200"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-200"
          >
            <FaLinkedin className="text-lg" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all duration-200"
          >
            <FaTwitter className="text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
}
