import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import paperBg from "../assets/paper-bg.png"; // Make sure this image exists in src/assets/

const publications = [
  {
    title: "Drones: Advancing Industries",
    authors: "Shourya Gupta",
    journal: "International Research Journal Of Engineering & Technology",
    date: "April, 2025",
    link: "https://www.irjet.net/archives/V12/i3/IRJET-V12I3135.pdf",
  },
  {
    title: "Robotics: Enhancing Healthcare",
    authors: "Shourya Gupta, Kirat Kaur Kalsi",
    journal: "International Research Journal Of Engineering & Technology",
    date: "June, 2025",
    link: "https://www.irjet.net/archives/V12/i6/IRJET-V12I6107.pdf",
  },
  {
    title: "Swarm Robotics: Architecture, Applications, and Future Prospects",
    authors: "Shourya Gupta, Gargi Surse",
    journal: "International Research Journal Of Engineering & Technology",
    date: "July, 2025",
    link: "https://www.irjet.net/archives/V12/i7/IRJET-V12I702.pdf",
  },
  {
    title: "Hybrid Computing: Redefining Computation",
    authors: "Shourya Gupta, Abhiraj Nair",
    journal: "International Research Journal Of Engineering & Technology",
    date: "August, 2025",
    link: "https://irjet.net/archives/V12/i8/IRJET-V12I804.pdf",
  }
];

const Publications = () => {
  return (
    <section
      id="publications"
      className="relative z-10 min-h-screen bg-cover bg-center bg-no-repeat py-16 px-6 md:px-20 text-white"
      style={{ backgroundImage: `url(${paperBg})` }}
    >
      {/* Background Overlay Blur */}
      <div className="absolute inset-0 bg-black/70 blur-[2.5px] z-0" />

      {/* Section Title */}
      <div className="relative z-10 mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-wide text-white">Publications</h2>
      </div>

      {/* Publication Cards */}
      <div className="relative z-10 flex flex-col gap-8 max-w-2xl mx-auto md:ml-0">
        {publications.map((pub, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md text-white p-6 rounded-2xl border border-white/10 
            shadow-[4px_4px_0px_#1f1f1f] 
            hover:shadow-[8px_8px_20px_rgba(255,255,255,0.15)] 
            hover:border-white/30 
            hover:scale-[1.02] 
            transition-all duration-300 transform"
          >
            <h3 className="text-2xl font-bold mb-3">{pub.title}</h3>
            <p className="text-base mb-1">
              <span className="font-semibold">Authors:</span> {pub.authors}
            </p>
            <p className="text-base mb-1">
              <span className="font-semibold">Published in:</span> {pub.journal}
            </p>
            <p className="text-base mb-4">
              <span className="font-semibold">Date:</span> {pub.date}
            </p>
            <a
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-lg text-base font-medium transition-all duration-200"
            >
              View Paper <FaExternalLinkAlt className="ml-2 text-sm" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Publications;
