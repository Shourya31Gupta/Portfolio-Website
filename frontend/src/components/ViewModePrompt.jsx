import React, { useState, useEffect } from "react";

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
    <div className="fixed inset-0 z-[9999] backdrop-blur-sm bg-black/20 flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-8 w-80 text-center text-white shadow-xl">
        <h2 className="text-2xl font-bold mb-6 tracking-wide text-white drop-shadow">
          Choose View Mode
        </h2>
        <button
          onClick={() => handle("desktop")}
          className="w-full mb-4 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-lg font-semibold text-white shadow-md transition"
        >
          Desktop View
        </button>
        <button
          onClick={() => handle("mobile")}
          className="w-full px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-lg font-semibold text-white shadow-md transition"
        >
          Mobile View
        </button>
      </div>
    </div>
  );
}
