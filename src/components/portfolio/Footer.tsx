const socialLinks = [
  { label: "GitHub", href: "https://github.com/adianvel", icon: "/portfolio/icons/github.svg" },
  { label: "X", href: "https://x.com/0xadianvel", icon: "/portfolio/icons/x.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adiansyah/", icon: "/portfolio/icons/linkedin.svg" },
];

export default function Footer() {
  return (
    <section className="mx-auto mt-20 flex w-full max-w-2xl flex-col items-start gap-8 border-t-[0.8px] border-dashed border-neutral-800/80 px-8 pt-16 text-foreground md:px-0">
      <blockquote className="m-0 flex w-full flex-col gap-3">
        <p className="m-0 text-lg leading-7 tracking-wide">
          “No tree, it is said, can grow to heaven unless its roots reach down to hell”
        </p>
        <cite className="self-end text-base leading-6 not-italic">— Carl Jung</cite>
      </blockquote>

      <footer className="flex w-full items-center justify-between py-8 text-neutral-700">
        <div className="flex items-center gap-2">
          <img className="site-brand-mark" src="/portfolio/images/adianvel-logo.avif" width={24} height={24} alt="" aria-hidden="true" />
          <p className="m-0 text-sm leading-5">© Adiansyah</p>
        </div>
        <nav aria-label="Social links" className="flex items-center gap-4">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              key={label}
            >
              <img className="site-social-icon" src={icon} width={24} height={24} alt="" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </footer>
    </section>
  );
}
