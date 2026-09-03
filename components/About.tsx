"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tags = ["Backend", "Python", "APIs", "AI"];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
      gsap.to(textRef.current, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 55%",
          end: "bottom 5%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-40">
      <div className="mx-auto max-w-3xl px-6 md:px-10" ref={textRef}>
        <span className="section-label">01 / About</span>
        <h2 className="mt-6 text-balance font-display text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-5xl">
          Building backend systems that connect data, APIs and AI.
        </h2>

        <div className="mt-10 space-y-5 font-body text-base leading-relaxed text-dim md:text-lg">
          <p>
            I&apos;m a Software Development student focused on backend engineering, building
            reliable applications with Python, Java, APIs and modern backend architectures.
          </p>
          <p>
            My work centers on designing and integrating REST APIs, automation workflows,
            databases and AI-powered services, with a strong interest in connecting traditional
            software engineering with large language models.
          </p>
          <p>
            I&apos;m currently building projects around LLM APIs, RAG pipelines, AI agents, MCP,
            tool calling and system integrations — exploring how these technologies can operate
            as real components inside production-oriented applications.
          </p>
          <p>
            My goal is to go beyond simply consuming AI models. I want to engineer scalable
            backend systems where AI, data and external services work together to solve
            real-world problems.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-xs text-ink"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
