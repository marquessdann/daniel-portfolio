"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { terminalLines } from "@/data/experience";

export default function GithubTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">Code lives here.</h2>
        <a
          href="https://github.com/marquessdann"
          target="_blank"
          rel="noreferrer"
          data-cursor="view"
          className="group mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-electric"
        >
          github.com/marquessdann
          <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
        </a>

        <div
          ref={ref}
          className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-surface/70 shadow-[0_0_60px_rgba(0,0,0,0.4)]"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-faint">
              <Github size={12} /> marquessdann — zsh
            </span>
          </div>

          <div className="space-y-4 p-6 font-mono text-sm">
            {terminalLines.map((line, i) => (
              <motion.div
                key={line.command}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.35 }}
              >
                <p className="text-dim">
                  <span className="text-cyan">$</span> {line.command}
                </p>
                <div className="mt-1.5 space-y-0.5 pl-4 text-ink">
                  {line.output.map((o) => (
                    <p key={o}>{o}</p>
                  ))}
                </div>
              </motion.div>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: terminalLines.length * 0.35 + 0.2 }}
              className="inline-block h-4 w-2 animate-pulseSoft bg-ink/70 align-middle"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
