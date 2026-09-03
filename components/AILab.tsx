"use client";

import { useState } from "react";
import { AmbientGlow } from "@/components/BackgroundEffects";

const glossary: Record<string, string> = {
  RAG: "Retrieves relevant context from a knowledge base before the model generates a response, keeping answers grounded in real data.",
  MCP: "A shared protocol that lets AI models connect to external tools and data sources through one consistent interface.",
  "Tool Calling": "Lets a model invoke external functions or APIs to take real actions instead of only producing text.",
  Embeddings: "Numeric representations of meaning, used to search and compare content by similarity rather than by keyword.",
  Agent: "A system that plans, calls tools and takes steps toward a goal with limited human input at each stage.",
};

type NodeId = keyof typeof glossary | "USER" | "API" | "Vector DB" | "LLM";

const nodeRows: { id: NodeId; hoverable: boolean }[][] = [
  [{ id: "USER", hoverable: false }],
  [{ id: "API", hoverable: false }],
  [{ id: "Agent", hoverable: true }],
  [
    { id: "Tool Calling", hoverable: true },
    { id: "RAG", hoverable: true },
  ],
  [
    { id: "MCP", hoverable: true },
    { id: "Embeddings", hoverable: true },
  ],
  [{ id: "LLM", hoverable: false }],
];

export default function AILab() {
  const [active, setActive] = useState<NodeId | null>(null);

  return (
    <section id="ai-lab" className="relative overflow-hidden py-32">
      <AmbientGlow />
      <div className="relative mx-auto max-w-4xl px-6 md:px-10">
        <span className="section-label">AI Lab</span>
        <h2 className="mt-6 text-balance font-display text-4xl font-medium text-ink sm:text-5xl">
          Exploring how software talks to intelligence.
        </h2>

        <div className="mt-20 flex flex-col items-center gap-6">
          {nodeRows.map((row, ri) => (
            <div key={ri} className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-8 sm:gap-14">
                {row.map((node) => (
                  <button
                    key={node.id}
                    onMouseEnter={() => node.hoverable && setActive(node.id)}
                    onFocus={() => node.hoverable && setActive(node.id)}
                    onMouseLeave={() => setActive(null)}
                    onBlur={() => setActive(null)}
                    className={`rounded-xl border px-5 py-3 font-mono text-xs transition-all duration-300 sm:text-sm ${
                      node.hoverable
                        ? "cursor-help border-white/10 bg-surface/70 text-ink hover:border-electric/50 hover:bg-electric/10 hover:text-electric"
                        : "cursor-default border-white/[0.08] bg-void/60 text-dim"
                    } ${active === node.id ? "border-electric/50 bg-electric/10 text-electric" : ""}`}
                  >
                    {node.id}
                  </button>
                ))}
              </div>
              {ri < nodeRows.length - 1 && (
                <div className="h-8 w-px animate-pulseSoft bg-gradient-to-b from-white/20 to-white/[0.04]" />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 h-16 max-w-md text-center">
          {active && glossary[active] && (
            <p className="font-body text-sm text-dim">{glossary[active]}</p>
          )}
          {!active && (
            <p className="font-mono text-xs text-faint">Hover a node to see what it does</p>
          )}
        </div>
      </div>
    </section>
  );
}
