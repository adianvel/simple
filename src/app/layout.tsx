import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adiansyah | Software Engineer",
  description: "Software engineer. Building with AI, full-stack technologies, and a curiosity for how things work.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="relative min-h-full flex flex-col">{children}</body>
    </html>
  );
}
