"use client";

import { useEffect, useRef } from "react";

export function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="glow left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 bg-violet/20"
        style={{ maxWidth: 900, maxHeight: 900 }}
      />
      <div
        className="glow left-[15%] top-[10%] h-[28vw] w-[28vw] bg-electric/14"
        style={{ maxWidth: 500, maxHeight: 500 }}
      />
      <div
        className="glow right-[8%] bottom-[5%] h-[24vw] w-[24vw] bg-cyan/10"
        style={{ maxWidth: 420, maxHeight: 420 }}
      />
      <div className="absolute inset-0 bg-grid opacity-[0.25] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
    </div>
  );
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export function NeuralParticles({ density = 42 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.round(density * 0.4) : density;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf: number;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }));
    };

    resize();
    init();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 140) {
            ctx.strokeStyle = `rgba(140,140,255,${0.09 * (1 - d / 140)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(200,200,255,0.4)";
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (!reduceMotion) {
      raf = requestAnimationFrame(draw);
    } else {
      draw();
    }

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
