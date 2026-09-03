"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Github, Radar } from "lucide-react";
import type { Project } from "@/data/projects";

const statusLabel: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  planned: "In design",
};

export default function ProjectShowcase({ project, reverse }: { project: Project; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [pulse, setPulse] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 180, damping: 20 });
  const springY = useSpring(rotY, { stiffness: 180, damping: 20 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(px * 10);
    rotX.set(-py * 10);
  };

  const resetTilt = () => {
    rotX.set(0);
    rotY.set(0);
    setHovered(null);
  };

  const scrollToArchitecture = () => {
    archRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setPulse(true);
    window.setTimeout(() => setPulse(false), 900);
  };

  const activeHighlights = hovered
    ? project.stack.find((s) => s.name === hovered)?.highlights ?? []
    : [];

  return (
    <div ref={ref} className="relative border-t border-white/[0.06] py-24 first:border-t-0 md:py-32">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-8 select-none font-display text-[26vw] font-medium leading-none text-white/[0.03] sm:text-[16vw] md:text-[13vw] ${
          reverse ? "right-0" : "left-0"
        }`}
      >
        {project.index}
      </span>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs text-dim">{project.category}</span>
            <h3 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">{project.name}</h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-lg font-body text-sm leading-relaxed text-dim md:text-base"
          >
            {project.description}
          </motion.p>

          {project.proof && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 flex items-start gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.04] px-3 py-2"
            >
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-400/80" />
              <span className="font-mono text-[0.7rem] leading-relaxed text-emerald-200/80">
                {project.proof}
              </span>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {project.stack.map((s, i) => (
              <motion.span
                key={s.name}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
                onMouseEnter={() => setHovered(s.name)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-default rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                  hovered === s.name
                    ? "border-electric/50 bg-electric/10 text-electric"
                    : "border-white/10 text-dim hover:border-white/25 hover:text-ink"
                }`}
              >
                {s.name}
              </motion.span>
            ))}
          </motion.div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-electric/50 hover:text-electric"
              >
                LIVE
                <ArrowUpRight size={12} className="transition-transform group-hover:rotate-45" />
              </a>
            ) : (
              <span
                title="Not deployed yet"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] px-4 py-2 font-mono text-xs text-faint"
              >
                LIVE
                <ArrowUpRight size={12} />
              </span>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-electric/50 hover:text-electric"
              >
                <Github size={12} />
                GITHUB
              </a>
            )}

            <button
              type="button"
              onClick={scrollToArchitecture}
              data-cursor="view"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-ink transition-colors hover:border-electric/50 hover:text-electric"
            >
              <Radar size={12} />
              ARCHITECTURE
            </button>

            <span className="ml-1 font-mono text-[11px] text-faint">{statusLabel[project.status]}</span>
          </div>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <motion.div
            ref={archRef}
            data-cursor="view"
            onMouseMove={onMouseMove}
            onMouseLeave={resetTilt}
            style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={`relative rounded-2xl border bg-surface/60 p-6 transition-shadow duration-500 md:p-8 ${
              pulse ? "border-electric/60 shadow-[0_0_50px_rgba(61,123,255,0.25)]" : "border-white/10"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet/[0.06] to-transparent" />
            <div className="flex flex-col items-center gap-3">
              {project.architecture.map((node, i) => (
                <div key={node.id} className="flex flex-col items-center gap-3">
                  <motion.div
                    initial={{ opacity: 0.3 }}
                    animate={
                      inView
                        ? { opacity: [0.3, 1, 0.55] }
                        : {}
                    }
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.18 }}
                    className={`rounded-lg border px-4 py-2 font-mono text-xs transition-all duration-300 sm:text-sm ${
                      activeHighlights.includes(node.label)
                        ? "border-electric/60 bg-electric/10 text-electric shadow-[0_0_20px_rgba(61,123,255,0.25)]"
                        : "border-white/10 bg-void/60 text-ink"
                    }`}
                  >
                    {node.label}
                  </motion.div>
                  {i < project.architecture.length - 1 && (
                    <div
                      className={`h-6 w-px transition-colors duration-300 ${
                        activeHighlights.includes(node.label) &&
                        activeHighlights.includes(project.architecture[i + 1].label)
                          ? "bg-electric/60"
                          : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
