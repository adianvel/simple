import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://www.adianvel.me";
const title = "Adiansyah | Software Engineer";
const description =
  "Software engineer. Building with AI, full-stack technologies, and a curiosity for how things work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Adiansyah",
    locale: "en_US",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  // suppressHydrationWarning covers <html> and <body> only: the Bitdefender
  // extension injects attributes (bis_skin_checked, __processed_*) into them
  // before React hydrates. Content mismatches in children are still reported.
  return (
    <html lang="en" className="dark h-full antialiased" suppressHydrationWarning>
      <body
        className="relative min-h-full flex flex-col"
        suppressHydrationWarning
      >{children}</body>
    </html>
  );
}
