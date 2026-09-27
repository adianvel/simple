"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Mail, MapPin } from "lucide-react";

const roles = ["Software Engineer", "Full-stack Developer", "AI Builder"];
const skills = [
  { name: "Laravel", icon: "laravel.svg" },
  { name: "Vue.js", icon: "vue.svg" },
  { name: "Elysia.js", icon: "elysia.svg" },
  { name: "MinIO storage", icon: "minio.svg" },
  { name: "Nuxt", icon: "nuxt.svg" },
  { name: "Docker", icon: "docker.svg" },
  { name: "ZenStack", icon: "zenstack.svg" },
  { name: "n8n", icon: "n8n.svg" },
  { name: "PostgreSQL", icon: "postgresql.svg" },
  { name: "Figma", icon: "figma.svg" },
];

export default function Hero() {
  const [role, setRole] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    let exitTimeout = 0;
    const interval = window.setInterval(() => {
      setRole((value) => {
        setPrevious(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? null : value);
        return (value + 1) % roles.length;
      });
      window.clearTimeout(exitTimeout);
      exitTimeout = window.setTimeout(() => setPrevious(null), 440);
    }, 2600);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(exitTimeout);
    };
  }, []);

  return (
    <section className="hero" aria-label="About Adiansyah">
      <style>{`
        .hero { width: 672px; margin: 96px auto 0; display: flex; flex-direction: column; gap: 32px; color: var(--foreground); font-family: var(--font-site, Geist, sans-serif); }
        .hero-profile { height: 70px; display: flex; align-items: center; gap: 16px; }
        .hero-profile-photo { width: 70px; height: 70px; flex: 0 0 70px; border-radius: 14px; background: var(--primary); object-fit: cover; object-position: center 18%; }
        .hero-name { margin: 0; font-size: 30px; line-height: 36px; font-weight: 600; }
        .hero-role { position: relative; height: 20px; font-size: 14px; line-height: 20px; }
        .hero-role-layer { position: absolute; top: 0; left: 0; white-space: nowrap; }
        .hero-role-in { animation: hero-role-in .45s both; }
        .hero-role-out { animation: hero-role-out .3s both; }
        @keyframes hero-role-in { from { opacity: 0; filter: blur(8px); transform: translateY(10px); } to { opacity: 1; filter: blur(0); transform: translateY(0); } }
        @keyframes hero-role-out { to { opacity: 0; filter: blur(8px); transform: translateY(-8px); } }
        .hero-meta { display: flex; gap: 32px; width: 100%; }
        .hero-meta-label { font-size: 12px; line-height: 16px; }
        .hero-meta-value { display: flex; align-items: center; gap: 8px; margin-top: 4px; font-size: 14px; line-height: 20px; font-weight: 600; white-space: nowrap; }
        .hero-description { margin: 0; font-size: 16px; line-height: 24px; font-weight: 300; }
        .hero-stack { position: relative; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .hero-skills { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 16px; margin: 0; padding: 0; list-style: none; }
        .hero-skill-icon { display: block; width: 32px; height: 32px; object-fit: contain; filter: brightness(0) invert(1); opacity: .7; }
        .hero-skill-elysia { filter: invert(1); opacity: .9; }
        :root.light .hero-skill-icon { filter: brightness(0); }
        :root.light .hero-skill-elysia { filter: none; opacity: 1; }
        .hero-caption { color: var(--secondary); opacity: .45; font-family: "Reenie Beanie", cursive; font-size: 24px; line-height: 32px; white-space: nowrap; }
        @media (max-width: 700px) {
          .hero { box-sizing: border-box; width: 408px; margin-left: -9px; margin-right: -9px; margin-bottom: 32px; padding: 0 32px; }
          .hero-meta { gap: 24px; overflow: hidden; }
          .hero-stack { gap: 12px; }
          .hero-skills { gap: 6px; }
          .hero-skill-icon { width: 28px; height: 28px; }
          .hero-caption { align-self: center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-role-in, .hero-role-out { animation: none; filter: none; transform: none; }
        }
      `}</style>

      <div className="hero-profile">
        <Image
          className="hero-profile-photo"
          src="/portfolio/images/profile.jpeg"
          alt="Kim Dokja from Omniscient Reader's Viewpoint"
          width={70}
          height={70}
          priority
        />
        <div>
          <h1 className="hero-name">Adiansyah</h1>
          <div className="hero-role" aria-live="polite" aria-atomic="true">
            <span className="sr-only">{roles[role]}</span>
            {previous !== null && <span className="hero-role-layer hero-role-out" aria-hidden="true">{roles[previous]}</span>}
            <span className="hero-role-layer hero-role-in" aria-hidden="true" key={role}>{roles[role]}</span>
          </div>
        </div>
      </div>

      <div className="hero-meta">
        <div>
          <div className="hero-meta-label">LOCATION</div>
          <div className="hero-meta-value"><MapPin size={12} aria-hidden="true" /><span>Yogyakarta</span></div>
        </div>
        <div>
          <div className="hero-meta-label">EMAIL</div>
          <div className="hero-meta-value"><Mail size={12} aria-hidden="true" /><a className="text-inherit underline-offset-4 hover:underline" href="mailto:ilhamadian346@gmail.com">ilhamadian346@gmail.com</a></div>
        </div>
      </div>

      <p className="hero-description">
        Building with AI, full-stack technologies, and a curiosity for how things work.
      </p>

      <div className="hero-stack" aria-label="Tools I work with">
        <span className="hero-caption">tools I work with</span>
        <ul className="hero-skills">
          {skills.map((skill) => (
            <li key={skill.name} title={skill.name}>
              <Image
                className={skill.name === "Elysia.js" ? "hero-skill-icon hero-skill-elysia" : "hero-skill-icon"}
                src={"/portfolio/icons/" + skill.icon}
                alt={skill.name}
                width={32}
                height={32}
                unoptimized
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
