import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "publications", label: "Publications" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false); // Close sheet on selection
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-900 text-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Shourya Gupta</h1>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <GiHamburgerMenu className="text-2xl" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-zinc-900 text-white p-6">
          <nav className="flex flex-col gap-4 mt-10">
            {sections.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="justify-start text-left w-full text-lg"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
