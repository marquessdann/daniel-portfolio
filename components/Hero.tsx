"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
import { heroWords, heroOrbitNear, heroOrbitFar } from "@/data/skills";
import { AmbientGlow, NeuralParticles } from "@/components/BackgroundEffects";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const parallax = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % heroWords.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e: MouseEvent) => {
      if (!orbitRef.current || reduceMotion) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      parallax.current = { x, y };
      gsap.to(orbitRef.current, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("mousemove", onMove);

    if (!reduceMotion && heroRef.current) {
      gsap.to(heroRef.current, {
        opacity: 0,
        scale: 0.94,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28"
    >
      <AmbientGlow />
      <div className="absolute inset-0 opacity-60">
        <NeuralParticles density={36} />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm text-dim"
          >
            Hi, I&apos;m
          </motion.p>

          <h1 className="mt-3 font-display text-[15vw] font-medium leading-[0.92] tracking-tight text-ink sm:text-[9vw] lg:text-[6.4vw]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              Daniel
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="block bg-gradient-to-r from-ink via-ink to-dim bg-clip-text text-transparent"
            >
              Marques
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col gap-2"
          >
            <span className="font-display text-xl text-ink sm:text-2xl">Junior Backend Developer</span>
            <div className="flex h-7 items-center overflow-hidden font-mono text-sm text-electric sm:text-base">
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroWords[wordIndex]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {heroWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-6 max-w-lg font-body text-sm text-dim"
          >
            Systems Analysis &amp; Development student building backend APIs and
            AI-integrated systems — from authentication services in Java to
            RAG pipelines in Python.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-body text-sm font-medium text-void transition-transform hover:-translate-y-0.5"
            >
              View Projects
              <ArrowUpRight size={15} className="transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="https://github.com/marquessdann"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-body text-sm text-ink transition-colors hover:border-white/35"
            >
              <Github size={15} />
              GitHub
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex items-center gap-2.5 font-mono text-xs text-dim"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to Junior Backend / AI roles
          </motion.div>
        </div>

        <div className="relative hidden h-[420px] items-center justify-center lg:flex" style={{ perspective: 1000 }}>
          <div ref={orbitRef} className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet to-electric shadow-[0_0_80px_20px_rgba(110,86,207,0.35)]" />

            <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 animate-spinSlow rounded-full border border-white/[0.08]">
              {heroOrbitNear.map((label, i) => {
                const angle = (360 / heroOrbitNear.length) * i;
                return (
                  <div
                    key={label}
                    className="absolute left-1/2 top-1/2 h-0 w-0"
                    style={{ transform: `rotate(${angle}deg) translateX(140px)` }}
                  >
                    <span
                      className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-surface/80 px-3 py-1 font-mono text-xs text-ink backdrop-blur-sm"
                      style={{ display: "inline-block", transform: `rotate(${-angle}deg)` }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 animate-spinSlowReverse rounded-full border border-white/[0.05]">
              {heroOrbitFar.map((label, i) => {
                const angle = (360 / heroOrbitFar.length) * i;
                return (
                  <div
                    key={label}
                    className="absolute left-1/2 top-1/2 h-0 w-0 opacity-60 blur-[0.3px]"
                    style={{ transform: `rotate(${angle}deg) translateX(200px)` }}
                  >
                    <span
                      className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/[0.06] bg-surface/60 px-2.5 py-1 font-mono text-[11px] text-dim backdrop-blur-sm"
                      style={{ display: "inline-block", transform: `rotate(${-angle}deg)` }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-10 flex w-full max-w-6xl justify-center px-6">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="h-14 w-px bg-gradient-to-b from-transparent via-dim to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
