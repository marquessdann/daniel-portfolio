"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !sectionRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <span className="section-label">03 / Journey</span>
        <h2 className="mt-6 font-display text-4xl font-medium text-ink sm:text-5xl">Where I&apos;m headed</h2>

        <div className="relative mt-16 pl-10">
          <div className="absolute left-0 top-1 h-full w-px bg-white/[0.08]">
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-violet via-electric to-cyan"
            />
          </div>

          <div className="flex flex-col gap-14">
            {journey.map((step) => (
              <div key={step.title} className="relative">
                <div className="absolute -left-[46px] top-1 h-2.5 w-2.5 rounded-full border border-white/30 bg-void" />
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-xl text-ink sm:text-2xl">{step.title}</h3>
                  {step.status && (
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-dim">
                      {step.status}
                    </span>
                  )}
                </div>
                <p className="mt-2 font-mono text-sm text-dim">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
