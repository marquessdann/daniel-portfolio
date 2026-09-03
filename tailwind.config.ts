import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        surface: "#0a0a0c",
        line: "#1a1a1f",
        ink: "#ededf0",
        dim: "#8b8b95",
        faint: "#55555f",
        violet: "#6e56cf",
        electric: "#3d7bff",
        cyan: "#4dd9e8",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        spinSlowReverse: {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        spinSlow: "spinSlow 60s linear infinite",
        spinSlowReverse: "spinSlowReverse 80s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
