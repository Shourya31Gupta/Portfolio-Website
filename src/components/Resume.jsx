import React from "react";
import {
  FaDownload,
  FaEye,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
} from "react-icons/fa";
import resumePDF from "../assets/resume.pdf"; // ✅ Your actual PDF
import resumeBg from "../assets/resume-bg.png"; // ✅ Add your image here

const Resume = () => {
  return (
    <section
      id="resume"
      className="relative z-10 min-h-screen py-16 px-6 md:px-20 bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${resumeBg})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 blur-[2.5px] z-0" />

      {/* Title */}
      <div className="relative z-10 mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-wide">Resume</h2>
      </div>

      {/* Grid content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Experience */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaBriefcase /> Experience
          </h3>
          <ul className="text-zinc-300 text-base space-y-3">
            <li>💻 Research Author – IRJET </li>
            <li>⚙️ Built 5+ full-stack projects using React, Firebase</li>
            <li>💼 3 Month Internship at DBA Consultants Pvt. Ltd.</li>
          </ul>
        </div>

        {/* Education */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaGraduationCap /> Education
          </h3>
          <ul className="text-zinc-300 text-base space-y-3">
            <li>🎓 Currently pursuing Diploma in Computer Engineering</li>
            <li>📘 Will pursue B.Tech (Lateral Entry) Post Diploma</li>
            <li>🧠 Published 3 Research Papers</li>
          </ul>
        </div>

        {/* Skills */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-md">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FaCode /> Skills
          </h3>

          <h4 className="text-lg font-medium mb-2 text-zinc-100">Technical Skills</h4>
          <div className="flex flex-wrap gap-3 text-sm text-white mb-6">
            <span className="bg-blue-600 px-3 py-1 rounded-full">C</span>
            <span className="bg-blue-600 px-3 py-1 rounded-full">C++</span>
            <span className="bg-yellow-600 px-3 py-1 rounded-full">Java</span>
            <span className="bg-green-600 px-3 py-1 rounded-full">SQL</span>
            <span className="bg-purple-600 px-3 py-1 rounded-full">HTML</span>
            <span className="bg-pink-600 px-3 py-1 rounded-full">Canva</span>
            <span className="bg-red-600 px-3 py-1 rounded-full">Cybersecurity</span>
            <span className="bg-cyan-600 px-3 py-1 rounded-full">AI & Data Science</span>
            <span className="bg-indigo-600 px-3 py-1 rounded-full">Robotics</span>
          </div>

          <h4 className="text-lg font-medium mb-2 text-zinc-100">Soft Skills</h4>
          <div className="flex flex-wrap gap-3 text-sm text-white">
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Leadership</span>
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Management</span>
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Problem Solving</span>
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Communication</span>
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Teamwork</span>
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Critical Thinking</span>
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Fast Learner</span>
            <span className="bg-zinc-700 px-3 py-1 rounded-full">Co-operative</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <a
          href={resumePDF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-base"
        >
          <FaEye className="mr-2" />
          View Resume
        </a>

        <a
          href={resumePDF}
          download
          className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 text-base"
        >
          <FaDownload className="mr-2" />
          Download PDF
        </a>
      </div>
    </section>
  );
};

export default Resume;
