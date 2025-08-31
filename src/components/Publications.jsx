import React from "react";
import { FaExternalLinkAlt, FaFileAlt, FaUsers, FaCalendar, FaJournalWhills, FaDownload, FaQuoteLeft } from "react-icons/fa";
import paperBg from "../assets/paper-bg.png";

const publications = [
  {
    title: "Drones: Advancing Industries",
    authors: "Shourya Gupta",
    journal: "International Research Journal Of Engineering & Technology",
    date: "April, 2025",
    link: "https://www.irjet.net/archives/V12/i3/IRJET-V12I3135.pdf",
    abstract: "Exploring the transformative impact of drone technology across various industrial sectors and its future potential.",
    category: "Technology"
  },
  {
    title: "Robotics: Enhancing Healthcare",
    authors: "Shourya Gupta, Kirat Kaur Kalsi",
    journal: "International Research Journal Of Engineering & Technology",
    date: "June, 2025",
    link: "https://www.irjet.net/archives/V12/i6/IRJET-V12I6107.pdf",
    abstract: "Investigating the integration of robotics in healthcare systems to improve patient care and medical procedures.",
    category: "Healthcare"
  },
  {
    title: "Swarm Robotics: Architecture, Applications, and Future Prospects",
    authors: "Shourya Gupta, Gargi Surse",
    journal: "International Research Journal Of Engineering & Technology",
    date: "July, 2025",
    link: "https://www.irjet.net/archives/V12/i7/IRJET-V12I702.pdf",
    abstract: "Comprehensive analysis of swarm robotics systems, their applications, and future development possibilities.",
    category: "Robotics"
  },
  {
    title: "Hybrid Computing: Redefining Computation",
    authors: "Shourya Gupta, Abhiraj Nair",
    journal: "International Research Journal Of Engineering & Technology",
    date: "August, 2025",
    link: "https://irjet.net/archives/V12/i8/IRJET-V12I804.pdf",
    abstract: "Examining the convergence of classical and quantum computing approaches for next-generation computational systems.",
    category: "Computing"
  }
];

const Publications = () => {
  return (
    <section
      id="publications"
      className="relative z-10 py-12 px-6 text-white"
      style={{
        backgroundImage: `url(${paperBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Simple overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Research <span className="gradient-text">Publications</span>
          </h2>
          <p className="text-base text-zinc-300 max-w-2xl mx-auto">
            Contributing to the advancement of technology through research and innovation.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Compact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="glass p-4 rounded-lg text-center border border-white/10">
            <FaFileAlt className="text-2xl text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{publications.length}</div>
            <div className="text-xs text-zinc-400">Papers Published</div>
          </div>
          <div className="glass p-4 rounded-lg text-center border border-white/10">
            <FaUsers className="text-2xl text-purple-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">4+</div>
            <div className="text-xs text-zinc-400">Collaborators</div>
          </div>
          <div className="glass p-4 rounded-lg text-center border border-white/10">
            <FaJournalWhills className="text-2xl text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">1</div>
            <div className="text-xs text-zinc-400">Journal</div>
          </div>
        </div>

        {/* Publication Cards */}
        <div className="space-y-4">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="group glass border border-white/10 rounded-lg p-4 hover:border-blue-500/30 
                transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-3">
                <div className="flex-1">
                  {/* Category Badge */}
                  <div className="inline-block mb-2">
                    <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-xs rounded-full border border-white/20 text-blue-400">
                      {pub.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-200">
                    {pub.title}
                  </h3>
                  
                  {/* Abstract */}
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {pub.abstract}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-1 flex items-center justify-center">
                    <FaUsers className="text-white text-xs" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Authors</div>
                    <div className="text-sm text-white font-medium">{pub.authors}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-1 flex items-center justify-center">
                    <FaJournalWhills className="text-white text-xs" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Journal</div>
                    <div className="text-sm text-white font-medium">{pub.journal}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 p-1 flex items-center justify-center">
                    <FaCalendar className="text-white text-xs" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Published</div>
                    <div className="text-sm text-white font-medium">{pub.date}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
                >
                  <FaDownload className="text-xs" />
                  View Paper
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
