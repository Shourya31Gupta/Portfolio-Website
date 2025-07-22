import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import projectsBg from "../assets/projects-bg.png";

// ✅ Importing images properly
import financeImg from "../assets/finance-tracker.jpg";
import readingImg from "../assets/reading-goals.png";
import apodImg from "../assets/apod-app.png";

const projects = [
  {
    title: "Personal Finance Tracker",
    image: financeImg,
    description: "Track income, expenses, and savings with an intuitive dashboard.",
    tech: "React • Tailwind • Firebase",
    github: "https://github.com/Shourya31Gupta/Personal-Finance-Tracker",
    live: "https://shouryas-finance-tracker-phi.vercel.app/",
  },
  {
    title: "My Reading Goals",
    image: readingImg,
    description: "Set and track your annual reading goals with monthly stats.",
    tech: "React • Firebase • Tailwind CSS",
    github: "https://github.com/Shourya31Gupta/My-Reading-Goals",
    live: "https://my-reading-goals-shouryas-projects-6a2c0b12.vercel.app/",
  },
  {
    title: "APOD App",
    image: apodImg,
    description: "Displays NASA's Astronomy Picture of the Day using their public API.",
    tech: "React Native • REST API",
    github: "https://github.com/Shourya31Gupta/APOD-App",
    live: "https://apod-app-shouryas-projects-6a2c0b12.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen bg-cover bg-center bg-no-repeat py-16 text-zinc-200"
      style={{ backgroundImage: `url(${projectsBg})` }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/70 blur-[2.5px] z-0" />

      {/* Title in center top */}
      <div className="relative z-10 mb-12 text-center">
        <h2 className="text-4xl font-bold tracking-wide text-white">Projects</h2>
      </div>

      {/* Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl 
              hover:scale-[1.02] hover:border-blue-500 
              transition-transform duration-200 flex flex-col justify-between h-full text-white shadow-xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4 border border-white/10"
              />

              <div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-zinc-300 mb-4">{project.description}</p>
              </div>

              <p className="text-base font-mono text-blue-400 mb-4">{project.tech}</p>

              <div className="flex gap-3 mt-auto flex-wrap">
                <Button asChild variant="default" className="text-sm">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    🔗 Live
                  </a>
                </Button>

                <Button asChild variant="ghost" className="text-sm border border-white/30 text-white hover:bg-white/10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FaGithub className="text-lg" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
