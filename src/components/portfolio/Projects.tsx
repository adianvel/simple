import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import type { ProjectEntry } from "./types";

const projects: ProjectEntry[] = [
  {
    title: "Qior",
    subtitle: "Token Distribution Protocol",
    image: "/portfolio/images/qior.avif",
    href: "https://www.qior.app/",
  },
  {
    title: "Klinik K2+",
    subtitle: "AI Counseling Platform",
    image: "/portfolio/images/klinik-k2.avif",
    href: "https://klinik-chatbot.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section className="site-projects" aria-labelledby="projects-heading">
      <header className="site-projects-header">
        <h2 id="projects-heading">PROJECTS</h2>
      </header>

      <div className="site-project-list">
        {projects.map((project) => (
          <a
            className="site-project-card"
            href={project.href}
            key={project.title}
            target="_blank"
            rel="noreferrer"
          >
            <div className="site-project-preview">
              <div className="site-project-frame">
                <Image
                  alt={project.title + " project preview"}
                  className="site-project-image"
                  height={152}
                  src={project.image}
                  unoptimized
                  width={256}
                />
              </div>
            </div>
            <div className="site-project-info">
              <div className="site-project-title">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
              <MoveUpRight aria-hidden="true" size={16} strokeWidth={1} />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
