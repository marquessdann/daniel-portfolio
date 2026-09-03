"use client";

import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daniel-marques-68870b211/", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/marquessdann", icon: Github },
  { label: "Email", href: "mailto:danigtba@gmail.com", icon: Mail },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-40">
      <div
        className="glow left-1/2 top-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 bg-violet/22"
        style={{ maxWidth: 800, maxHeight: 800 }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <span className="section-label">04 / Contact</span>
        <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] text-ink sm:text-6xl md:text-7xl">
          Let&apos;s build something
          <br />
          <span className="text-transparent [-webkit-text-stroke:1px_theme(colors.ink)] drop-shadow-[0_0_40px_rgba(110,86,207,0.45)]">
            useful.
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-md font-body text-sm text-dim md:text-base">
          I&apos;m currently open to junior backend and AI development opportunities.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {links.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-body text-sm text-ink transition-colors hover:border-white/35"
            >
              <Icon size={15} />
              {label}
              <ArrowUpRight size={13} className="transition-transform group-hover:rotate-45" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
