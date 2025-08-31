import React, { useState, useEffect } from "react";
import { FaDesktop, FaMobile, FaTimes } from "react-icons/fa";

export default function ViewModePrompt({ setViewMode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const choice = sessionStorage.getItem("viewMode");
    if (choice) {
      setVisible(false);
      setViewMode(choice);
    }
  }, []);

  const handle = (mode) => {
    sessionStorage.setItem("viewMode", mode);
    setViewMode(mode);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] backdrop-blur-md bg-black/60 flex items-center justify-center p-4">
      <div className="glass-dark border border-white/20 rounded-3xl p-8 w-full max-w-md text-center text-white shadow-2xl relative animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={() => handle("mobile")}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all duration-300"
        >
          <FaTimes className="text-lg" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="text-3xl font-bold gradient-text">SG</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">
            Welcome to My Portfolio
          </h2>
          <p className="text-zinc-300">
            Choose your preferred viewing experience
          </p>
        </div>

        {/* View Mode Options */}
        <div className="space-y-4">
          <button
            onClick={() => handle("desktop")}
            className="w-full p-6 glass border border-white/20 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaDesktop className="text-white text-xl" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Desktop View</h3>
                <p className="text-sm text-zinc-400">Use for better UI and navigation</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handle("mobile")}
            className="w-full p-6 glass border border-white/20 rounded-2xl hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaMobile className="text-white text-xl" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white">Mobile View</h3>
                <p className="text-sm text-zinc-400">Use for Quicker Access</p>
              </div>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-zinc-500">
            You can change this later in your browser settings
          </p>
        </div>
      </div>
    </div>
  );
}
