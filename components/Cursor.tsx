"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const scaleRef = useRef(1);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      const link = target.closest("a, button");
      const project = target.closest("[data-cursor='view']");
      scaleRef.current = project ? 2.4 : link ? 1.7 : 1;
      setLabel(project ? "VIEW" : "");
    };

    let raf: number;
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.14;
      ring.y += (pos.y - ring.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-ink"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex h-9 w-9 items-center justify-center rounded-full border border-white/25"
        aria-hidden="true"
      >
        <span className="font-mono text-[7px] tracking-wide text-ink">{label}</span>
      </div>
    </>
  );
}
