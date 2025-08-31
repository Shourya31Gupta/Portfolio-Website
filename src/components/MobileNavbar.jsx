
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
        className="p-2 hover:bg-blue-500/10 rounded-xl transition-all duration-300"
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
          <div className="absolute right-0 top-0 h-full w-80 glass-dark border-l border-white/10 text-white p-0">
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
                className="p-2 hover:bg-blue-500/10 rounded-xl"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col h-full bg-black">
            <div className="flex-1 p-6 bg-gray-900">
              <div className="space-y-3">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      className="w-full text-left p-4 rounded-xl hover:bg-blue-600/20 transition-all duration-200 group flex items-center border border-gray-600 hover:border-blue-500"
                      onClick={() => scrollToSection(section.id)}
                    >
                      <Icon className="text-lg mr-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" />
                      <span className="text-base font-medium text-white group-hover:text-blue-200 transition-colors duration-200">
                        {section.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Admin Link */}
            <div className="p-6 border-t border-gray-600 bg-gray-900">
              <button
                className="w-full text-left p-4 rounded-xl text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/20 transition-all duration-200 group flex items-center border border-gray-600 hover:border-yellow-500"
                onClick={() => {
                  window.location.href = "/admin/contact";
                  setOpen(false);
                }}
              >
                <span className="text-lg mr-4">🔐</span>
                <span className="text-base font-medium">Admin Panel</span>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 text-center text-xs text-zinc-500 bg-gray-900">
              <p>© 2024 Shourya Gupta</p>
            </div>
          </nav>
        </div>
        </div>
      )}
    </header>
  );
}
