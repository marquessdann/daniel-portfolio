"use client";

import { useEffect, useRef, type ReactElement } from "react";
import { techCloudIcons } from "@/data/skills";

const customIcons: Record<string, ReactElement> = {
  java: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5V8z" />
      <path d="M17 9h1.5a2.5 2.5 0 010 5H17" />
      <path d="M8 3c0 1-1 1-1 2M12 3c0 1-1 1-1 2" />
    </svg>
  ),
  fastapi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  spring: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 5c-7 0-14 4-14 12 0 2 1 3 3 3 8 0 12-7 12-14 0-1 0-1-1-1z" />
      <path d="M6 19c3-3 6-9 13-13" />
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M6 8v8M6 12h6a4 4 0 004-4" />
    </svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="5" height="5" rx="1" />
      <rect x="9" y="10" width="5" height="5" rx="1" />
      <rect x="15" y="10" width="5" height="5" rx="1" />
      <rect x="9" y="4" width="5" height="5" rx="1" />
      <path d="M3 16c0 3 3 4 9 4s9-1 9-4" />
    </svg>
  ),
  vscode: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4L2 12l6 8M16 4l6 8-6 8" />
    </svg>
  ),
  rest: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h13l-3-3M20 17H7l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  rag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10" cy="10" r="6" />
      <path d="M15 15l5 5" strokeLinecap="round" />
      <circle cx="8" cy="9" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="11" cy="11" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  agents: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="8" width="14" height="10" rx="2" />
      <path d="M12 8V4M9 4h6" strokeLinecap="round" />
      <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  claude: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </svg>
  ),
  mcp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 3v5M15 3v5M7 8h10l-1 5a4 4 0 01-8 0z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17v4" strokeLinecap="round" />
    </svg>
  ),
  tool: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.3 2.3-2-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </svg>
  ),
};

type Ball = {
  el: HTMLDivElement;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function TechCloud() {
  const cloudRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Free-floating "bouncing ball" movement — each icon drifts slowly and
  // bounces off the container edges, independent of the others.
  useEffect(() => {
    const cloud = cloudRef.current;
    if (!cloud) return;

    const rect = cloud.getBoundingClientRect();
    const W = rect.width || 1;
    const H = rect.height || 1;

    const balls: Ball[] = techCloudIcons
      .map((icon, i) => {
        const el = itemRefs.current[i];
        if (!el) return null;
        const size = icon.size;
        const cx0 = W / 2;
        const cy0 = H / 2;
        const R0 = Math.min(W, H) / 2 - size / 2;
        let sx = (icon.left / 100) * W - size / 2 - cx0;
        let sy = (icon.top / 100) * H - size / 2 - cy0;
        const sd = Math.sqrt(sx * sx + sy * sy);
        if (sd > R0 && sd > 0) {
          sx = (sx / sd) * R0;
          sy = (sy / sd) * R0;
        }
        const x = cx0 + sx;
        const y = cy0 + sy;
        const speed = 0.1 + Math.random() * 0.1;
        const angle = Math.random() * Math.PI * 2;
        return {
          el,
          size,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      })
      .filter((b): b is Ball => b !== null);

    let raf = 0;
    const tick = () => {
      const r = cloud.getBoundingClientRect();
      const w = r.width || 1;
      const h = r.height || 1;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) / 2;
      for (const b of balls) {
        b.x += b.vx;
        b.y += b.vy;

        // circular boundary: reflect velocity across the radial normal when
        // the ball's center crosses the edge of the round container
        const bcx = b.x + b.size / 2;
        const bcy = b.y + b.size / 2;
        const dx = bcx - cx;
        const dy = bcy - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const limit = R - b.size / 2;
        if (dist > limit && dist > 0) {
          const nx = dx / dist;
          const ny = dy / dist;
          const dot = b.vx * nx + b.vy * ny;
          b.vx -= 2 * dot * nx;
          b.vy -= 2 * dot * ny;
          b.x = cx + nx * limit - b.size / 2;
          b.y = cy + ny * limit - b.size / 2;
        }
        b.el.style.transform = `translate(${b.x}px, ${b.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cloudRef.current;
    if (!el || !layerRef.current || !glowRef.current) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    layerRef.current.style.transform = `translate(${x * -14}px, ${y * -14}px)`;
    glowRef.current.style.transform = `translate(calc(-50% + ${x * 24}px), calc(-50% + ${y * 24}px))`;
  };

  const handleMouseLeave = () => {
    if (layerRef.current) layerRef.current.style.transform = "translate(0,0)";
    if (glowRef.current) glowRef.current.style.transform = "translate(-50%,-50%)";
  };

  const setIconColor = (index: number, color: string | null) => {
    const el = itemRefs.current[index];
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-glyph]").forEach((glyph) => {
      glyph.style.color = color ?? "";
      glyph.style.borderColor = color ?? "";
    });
  };

  return (
    <div id="stack" className="relative py-12">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <span className="section-label">Stack</span>
        <h3 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
          Technologies I work with
        </h3>
      </div>

      <div
        ref={cloudRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto mt-12 aspect-square w-[min(600px,92vw)] overflow-hidden rounded-full border border-white/[0.08] bg-white/[0.015]"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/30 blur-[60px] transition-transform duration-300 ease-out"
        />

        <div ref={layerRef} className="absolute inset-0 transition-transform duration-300 ease-out">
          {techCloudIcons.map((icon, i) => (
            <div
              key={icon.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={() => setIconColor(i, icon.brand)}
              onMouseLeave={() => setIconColor(i, null)}
              className="group absolute left-0 top-0 flex flex-col items-center gap-2"
              style={{ willChange: "transform" }}
            >
              <span
                data-glyph
                className="flex items-center justify-center text-white/50 transition-all duration-200 hover:scale-110"
                style={{ width: icon.size, height: icon.size }}
              >
                {icon.badge ? (
                  <span
                    data-glyph
                    className="flex h-full w-full items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] font-mono text-[0.7rem] font-semibold text-white/55"
                  >
                    {icon.badge}
                  </span>
                ) : (
                  customIcons[icon.custom!]
                )}
              </span>
              <span className="pointer-events-none translate-y-1 whitespace-nowrap rounded-full border border-white/10 bg-surface/90 px-3 py-1 font-mono text-[0.65rem] text-ink opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                {icon.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
