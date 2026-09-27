"use client";

import { useEffect, useRef, useState } from "react";
import type { WritingEntry } from "./types";

const entries: WritingEntry[] = [
  {
    year: "2026",
    title: "Coinfest Asia 2026",
    publisher: "Featured by UNU Jogja",
    date: "26 Aug",
    href: "https://unu-jogja.ac.id/en/news/mahasiswa-dan-alumni-unu-jogja-ikuti-coinfest",
  },
];

export default function Writing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="writing-heading"
      className="writing-section"
      data-visible={visible}
    >
      <h2 className="writing-heading" id="writing-heading">WRITING</h2>
      {entries.map(({ year, title, publisher, date, href }) => (
        <div className="writing-row" key={title}>
          <span>{year}</span>
          <div>
            <a className="writing-link" href={href} target="_blank" rel="noreferrer">
              {title}
            </a>
            <p className="writing-publisher">{publisher}</p>
          </div>
          <time>{date}</time>
        </div>
      ))}
      <div className="writing-row">
        <span>2026</span>
        <div>
          <span className="writing-link">Lorem ipsum dolor sit amet</span>
          <p className="writing-publisher">Placeholder</p>
        </div>
        <time dateTime="2026-09-27">27 Sep</time>
      </div>
    </section>
  );
}
