import React from "react";
import homeBg from "../assets/home-bg.png";
import { FaDatabase, FaShieldAlt, FaCode, FaRobot, FaGlobe, FaLightbulb } from "react-icons/fa";

export default function About() {
  const skills = [
    { name: "Database Engineering", icon: FaDatabase, color: "from-blue-500 to-cyan-500" },
    { name: "Cybersecurity", icon: FaShieldAlt, color: "from-green-500 to-emerald-500" },
    { name: "Full-Stack Development", icon: FaCode, color: "from-purple-500 to-pink-500" },
    { name: "Robotics & AI", icon: FaRobot, color: "from-orange-500 to-red-500" },
    { name: "Research & Innovation", icon: FaLightbulb, color: "from-yellow-500 to-orange-500" },
    { name: "Global Collaboration", icon: FaGlobe, color: "from-indigo-500 to-blue-500" },
  ];

  const achievements = [
    "Published 4 research papes",
    "Co-authored 3 research papers",
    "Specialized in Swarm Robotics",
    "Expertise in Healthcare Robotics",
    "Diploma in Computer Engineering",
    "Passionate about meaningful tech"
  ];

  return (
    <section
      id="about"
      className="min-h-screen py-20 border-b border-zinc-800 text-white bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      {/* Enhanced overlay for better visibility */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-zinc-200 max-w-3xl mx-auto mb-6">
            Passionate tech enthusiast with expertise in cutting-edge technologies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Personal Info */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="glass p-8 rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-6 text-white">
                Who I Am
              </h3>
              <p className="text-lg leading-8 mb-6 text-zinc-100">
                I'm{" "}
                <span className="font-bold text-white">Shourya Gupta</span>, a passionate tech enthusiast pursuing a diploma in Computer Engineering.
                I specialize in blending logic and creativity to solve real-world problems with code.
              </p>
              <p className="text-lg leading-8 mb-6 text-zinc-100">
                I'm especially interested in{" "}
                <span className="text-white font-bold">Database Engineering</span> and{" "}
                <span className="text-white font-bold">Cybersecurity</span>, and have already published four research paper and co-authored three research papers on innovative tech topics like
                Swarm Robotics and Robotics in Healthcare.
              </p>
              <p className="text-lg leading-8 text-zinc-100">
                I thrive on building futuristic, meaningful tools and aim to work globally, solving challenging tech problems that matter.
              </p>
            </div>

            {/* Achievements */}
            <div className="glass p-6 rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md">
              <h4 className="text-xl font-bold mb-4 text-white">Key Achievements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 text-base">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <span className="text-zinc-100 font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Skills & Visual Elements */}
          <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            {/* Skills Grid */}
            <div className="glass p-8 rounded-2xl border border-white/20 bg-black/30 backdrop-blur-md">
              <h4 className="text-xl font-bold mb-6 text-white text-center">Core Skills</h4>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={index}
                      className="group p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
                    >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${skill.color} p-3 flex items-center justify-center shadow-lg`}>
                        <Icon className="text-white text-lg" />
                      </div>
                      <p className="text-sm font-semibold text-center text-white">
                        {skill.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
