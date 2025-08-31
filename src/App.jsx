import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ViewModePrompt from "./components/ViewModePrompt.jsx";
import Navbar from "./components/Navbar.jsx";
import MobileNavbar from "./components/MobileNavbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Achievements from "./components/Achievements.jsx";
import Publications from "./components/Publications.jsx";
import Resume from "./components/Resume.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  const [viewMode, setViewMode] = useState("");

  const MainSiteContent = (
    <>
      {viewMode === "desktop" ? <Navbar /> : <MobileNavbar />}
      <main className={viewMode === "desktop" ? "ml-64 p-6" : "p-4"}>
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Publications />
        <Resume />
        <Contact />
      </main>
    </>
  );

  return (
    <Router>
      <div className="relative bg-black text-white min-h-screen">
        <Routes>
          {/* Main Portfolio */}
          <Route
            path="/"
            element={
              <>
                {MainSiteContent}
                {!viewMode && <ViewModePrompt setViewMode={setViewMode} />}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
