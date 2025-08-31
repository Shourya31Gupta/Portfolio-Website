
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome, FaUser, FaCode, FaTrophy, FaFileAlt, FaEnvelope, FaShieldAlt, FaTimes } from "react-icons/fa";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  const sections = [
    { id: "hero", label: "Home", icon: FaHome },
    { id: "about", label: "About", icon: FaUser },
    { id: "projects", label: "Projects", icon: FaCode },
    { id: "achievements", label: "Achievements", icon: FaTrophy },
    { id: "publications", label: "Publications", icon: FaFileAlt },
    { id: "resume", label: "Resume", icon: FaShieldAlt },
    { id: "contact", label: "Contact", icon: FaEnvelope },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false); // Close sheet on selection
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-dark border-b border-white/10 text-white shadow-lg p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <span className="text-lg font-bold gradient-text">SG</span>
          </div>
        </div>
        <h1 className="text-xl font-bold gradient-text">Shourya Gupta</h1>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
      >
        <GiHamburgerMenu className="text-2xl" />
      </button>
      
      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute left-0 top-0 h-full w-80 glass-dark border-r border-white/10 text-white p-0">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-xl font-bold gradient-text">SG</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold gradient-text">Shourya Gupta</h2>
                  <p className="text-xs text-zinc-400">Portfolio</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col p-6">
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className="justify-start text-left w-full text-lg p-4 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                    onClick={() => scrollToSection(section.id)}
                  >
                    <Icon className="text-lg mr-3 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                    {section.label}
                  </button>
                );
              })}
            </div>
            
            {/* Admin Link */}
            <div className="pt-6 mt-6 border-t border-white/10">
              <button
                className="justify-start text-left w-full text-lg p-4 rounded-xl text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-all duration-300 group"
                onClick={() => {
                  window.location.href = "/admin/contact";
                  setOpen(false);
                }}
              >
                <span className="text-lg mr-3">🔐</span>
                Admin Panel
              </button>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 text-center text-xs text-zinc-500">
              <p>© 2024 Shourya Gupta</p>
              <p className="mt-1">Made with ❤️ & React</p>
            </div>
          </nav>
        </div>
        </div>
      )}
    </header>
  );
}
