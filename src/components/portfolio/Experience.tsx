import type { ExperienceEntry } from "./types";

const experience: ExperienceEntry[] = [
  {
    date: "2026",
    title: "Developer — Mancer x Superteam Indonesia",
    description: "Building a Solana token distribution protocol across smart contracts and frontend.",
  },
  {
    date: "2025",
    title: "HackQuest Advocate",
    description: "Helping developers learn Web3 through workshops and community programs.",
  },
  {
    date: "2024",
    title: "Head of R&D — HIMATIKA, UNU Yogyakarta",
    description:
      "Leading blockchain study sessions, mentoring peers on Solana development, and organizing hands-on campus workshops.",
  },
];

export default function Experience() {
  return (
    <section className="mx-auto mt-12 flex w-full max-w-2xl flex-col gap-8 px-6 text-foreground md:px-0">
      <div className="flex flex-col gap-2">
        <h2 className="text-xs leading-4 font-normal">EXPERIENCE</h2>
        <p className="text-base leading-6">
          Roles across product development, Web3 education, and community building.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {experience.map((entry) => (
          <article
            className="group flex w-full flex-col items-start gap-2 px-[15px] opacity-80 transition-opacity duration-300 ease-in-out hover:opacity-100 md:flex-row md:justify-between md:gap-0"
            key={entry.date}
          >
            <time className="w-auto shrink-0 translate-x-0 text-xs leading-4 text-muted-foreground transition-transform duration-300 ease-in-out md:w-[128px] md:-translate-x-[10px] md:group-hover:translate-x-0">
              {entry.date}
            </time>
            <div className="w-full min-w-0 shrink-0 translate-x-0 text-base leading-6 transition-transform duration-300 ease-in-out md:w-[514px] md:translate-x-[10px] md:group-hover:translate-x-0">
              <h3 className="font-semibold">{entry.title}</h3>
              <p className="mt-1">{entry.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
