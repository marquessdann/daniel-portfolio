"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const flow = [
  "API Design",
  "Authentication",
  "Database",
  "AI Layer",
  "Observability",
  "Deployment",
];

const principles = ["REST APIs", "JWT", "PostgreSQL", "Docker", "RAG", "Vector Search", "Tool Calling", "MCP"];

export default function HowIBuild() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <section ref={ref} className="relative py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <span className="section-label">How I build</span>
        <h2 className="mt-6 font-display text-3xl font-medium text-ink sm:text-4xl">
          Every project follows the same backbone.
        </h2>

        <div className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-4">
          {flow.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="rounded-full border border-white/10 bg-surface/60 px-4 py-2 font-mono text-xs text-ink sm:text-sm"
              >
                {step}
              </motion.span>
              {i < flow.length - 1 && (
                <ArrowRight size={14} className="shrink-0 text-faint" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {principles.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
              className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[11px] text-dim"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
