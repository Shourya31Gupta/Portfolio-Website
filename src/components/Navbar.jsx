import { useEffect, useState } from "react";
import { FaHome, FaUser, FaCode, FaTrophy, FaFileAlt, FaEnvelope, FaShieldAlt } from "react-icons/fa";

const sections = [
  { id: "hero", label: "Home", icon: FaHome },
  { id: "about", label: "About", icon: FaUser },
  { id: "projects", label: "Projects", icon: FaCode },
  { id: "achievements", label: "Achievements", icon: FaTrophy },
  { id: "publications", label: "Publications", icon: FaFileAlt },
  { id: "resume", label: "Resume", icon: FaShieldAlt },
  { id: "contact", label: "Contact", icon: FaEnvelope },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(`Section ${entry.target.id} is now visible`);
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2, // Reduced threshold for better detection
        rootMargin: "-10% 0px -10% 0px" // Reduced margin for more accurate detection
      }
    );

    // Observe all sections
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) {
        console.log(`Observing section: ${id}`);
        observer.observe(section);
      } else {
        console.warn(`Section with id '${id}' not found`);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(`Scrolling to section: ${sectionId}`, section);
      
      // For the contact section, scroll to the very bottom
      if (sectionId === 'contact') {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      } else {
        // For other sections, use normal scroll behavior
        const targetPosition = section.offsetTop;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      
      // Update active section immediately for better UX
      setActiveSection(sectionId);
    } else {
      console.error(`Section with id '${sectionId}' not found`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 glass-dark border-r border-white/10 flex flex-col p-6 space-y-2 z-50">
      {/* Logo/Brand */}
      <div className="mb-8 p-4">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <span className="text-2xl font-bold gradient-text">SG</span>
          </div>
        </div>
        <h1 className="text-xl font-bold text-center gradient-text">Shourya Gupta</h1>
        <p className="text-xs text-zinc-400 text-center mt-1">Portfolio</p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 ${
                activeSection === section.id 
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400" 
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              <Icon className={`text-lg transition-all duration-300 ${
                activeSection === section.id ? "text-blue-400" : "text-zinc-400 group-hover:text-white"
              }`} />
              <span className="font-medium">{section.label}</span>
              
              {/* Active indicator */}
              {activeSection === section.id && (
                <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>
      


      {/* Admin Link */}
      <div className="pt-6 border-t border-white/10">
        <a
          href="/admin/contact"
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-all duration-300 group"
        >
          <span className="text-lg">🔐</span>
          <span className="font-medium">Admin Panel</span>
          <div className="ml-auto w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-zinc-500 pt-4">
        <p>© 2025 Shourya Gupta</p>
      </div>
    </nav>
  );
}
