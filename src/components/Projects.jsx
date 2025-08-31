import { Button } from "./ui/button";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import projectsBg from "../assets/projects-bg.png";

// ✅ Importing images properly
import financeImg from "../assets/finance-tracker.jpg";
import readingImg from "../assets/reading-goals.png";
import apodImg from "../assets/apod-app.png";

const projects = [
  {
    title: "Personal Finance Tracker",
    image: financeImg,
    description: "Track income, expenses, and savings with an intuitive dashboard. Features real-time analytics, budget planning, and financial insights.",
    tech: ["React", "Tailwind", "Firebase", "Chart.js"],
    github: "https://github.com/Shourya31Gupta/Personal-Finance-Tracker",
    live: "https://shouryas-finance-tracker-phi.vercel.app/",
    category: "Full-Stack"
  },
  {
    title: "My Reading Goals",
    image: readingImg,
    description: "Set and track your annual reading goals with monthly stats. Includes progress tracking, book recommendations, and reading analytics.",
    tech: ["React", "Firebase", "Tailwind CSS", "Local Storage"],
    github: "https://github.com/Shourya31Gupta/My-Reading-Goals",
    live: "https://my-reading-goals-shouryas-projects-6a2c0b12.vercel.app/",
    category: "Web App"
  },
  {
    title: "APOD App",
    image: apodImg,
    description: "Displays NASA's Astronomy Picture of the Day using their public API. Features daily updates, image details, and space exploration content.",
    tech: ["React Native", "REST API", "NASA API", "Mobile First"],
    github: "https://github.com/Shourya31Gupta/APOD-App",
    live: "https://apod-app-shouryas-projects-6a2c0b12.vercel.app/",
    category: "Mobile App"
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
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Section Header */}
      <div className="relative z-10 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-white mb-4">
          My <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
          Here are some of the projects I've built, showcasing my skills in full-stack development, 
          mobile apps, and innovative solutions.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group relative glass border border-white/10 p-5 rounded-xl 
                hover:scale-[1.02] hover:border-blue-500/30 
                transition-all duration-300 flex flex-col justify-between h-full text-white"
            >
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/10 backdrop-blur-sm text-xs px-2 py-1 rounded-full border border-white/20">
                  {project.category}
                </span>
              </div>

              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Project Content */}
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-300 mb-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      className="px-2 py-1 bg-white/10 backdrop-blur-sm text-xs rounded-full border border-white/20 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto">
                <Button 
                  asChild 
                  variant="default" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm border-0"
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1">
                    <FaExternalLinkAlt className="text-xs" />
                    Live Demo
                  </a>
                </Button>

                <Button 
                  asChild 
                  variant="ghost" 
                  className="px-3 border border-white/30 text-white hover:bg-white/10 text-sm"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <FaGithub className="text-sm" />
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
