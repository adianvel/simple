"use client";

import { useEffect, useState } from "react";
import { Mail, Moon, Sun } from "lucide-react";

const EMAIL = "ilhamadian346@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/adiansyah/";

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const copyEmail = (event: KeyboardEvent) => {
      const active = document.activeElement;
      if (
        event.key.toLowerCase() !== "c" ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (active instanceof HTMLElement &&
          (active.isContentEditable || active.matches("input, textarea, select")))
      ) {
        return;
      }
      void navigator.clipboard?.writeText(EMAIL).catch(() => {});
    };

    window.addEventListener("keydown", copyEmail);
    return () => window.removeEventListener("keydown", copyEmail);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.classList.toggle("light", next === "light");
  };

  return (
    <header
      className="fixed top-0 z-[9999] w-full"
      style={{
        boxSizing: "border-box",
        left: "50%",
        height: 50,
        padding: "16px 0 8px",
        transform: "translateX(-50%)",
        backdropFilter: "blur(8px)",
        background: "transparent",
      }}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex items-center justify-between"
        style={{
          width: "calc(100% - 32px)",
          maxWidth: 672,
          height: 26,
          fontFamily: "var(--font-site, Geist, sans-serif)",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: "24px",
        }}
      >
        <a href="/" className="text-neutral-500 transition-colors hover:text-foreground">
          Home
        </a>

        <div className="flex items-center gap-2">
          <div className="group relative h-[25px] w-[90px] shrink-0">
            <button
              type="button"
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-sm transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] group-hover:pointer-events-none group-hover:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                width: 90,
                height: 25,
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
                fontSize: 12,
                lineHeight: "16px",
              }}
            >
              Get in touch
            </button>

            <div
              role="group"
              aria-label="Contact options"
              className="invisible pointer-events-none absolute right-0 top-0 z-10 flex scale-95 flex-col items-center justify-start gap-1 rounded-sm bg-secondary text-secondary-foreground opacity-0 transition-[opacity,transform] duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100"
              style={{
                boxSizing: "border-box",
                width: 130,
                height: 100,
                padding: "4px 16px",
              }}
            >
              <div className="flex w-full items-center justify-center rounded-sm p-1 tracking-[0.6px]" style={{ fontSize: 12, lineHeight: "16px" }}>
                Get in touch
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={"mailto:" + EMAIL}
                  aria-label="Email Adiansyah"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/70 p-2 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Mail className="text-secondary-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:text-secondary-foreground" size={24} strokeWidth={1} aria-hidden="true" />
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Adiansyah on LinkedIn"
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/70 p-2 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img className="site-social-icon transition-transform duration-300 group-hover:scale-110" src="/portfolio/icons/linkedin.svg" width={24} height={24} alt="" aria-hidden="true" />
                </a>
              </div>
              <div className="flex w-full items-center justify-between gap-1 whitespace-nowrap text-secondary-foreground/70" style={{ fontSize: 8, lineHeight: "10.67px" }}>
                <span>* press</span>
                <kbd className="rounded-xs bg-secondary/90 p-[2px] font-black text-[10px] leading-3 text-secondary-foreground">C</kbd>
                <span>to copy email</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label={"Switch to " + (theme === "dark" ? "light" : "dark") + " theme"}
              aria-pressed={theme === "light"}
              onClick={toggleTheme}
              className="flex h-[26px] w-[26px] shrink-0 cursor-pointer items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95 hover:bg-white dark:hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              {theme === "dark" ? <Sun size={14} strokeWidth={1} aria-hidden="true" /> : <Moon size={14} strokeWidth={1} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
