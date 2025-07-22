import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "publications", label: "Publications" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6, // 60% of the section must be visible
      }
    );

    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-black text-white flex flex-col p-6 space-y-4 z-50">
      <h1 className="text-2xl font-bold mb-8">Shourya Gupta</h1>

      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`text-lg hover:text-purple-400 transition duration-200 ${
            activeSection === section.id ? "text-purple-500 font-bold" : ""
          }`}
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}
