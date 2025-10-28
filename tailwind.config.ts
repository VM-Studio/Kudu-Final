import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kudu: {
          primary: "#647A8B",
          ink: "#0F172A",
          muted: "#94A3B8",
          bg: "#0B0F14",
          card: "#111827",
          accent: "#C7D2FE",
          line: "rgba(100,122,139,0.18)",
        },
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "ui-sans-serif", "Inter", "Arial"],
      },
      borderRadius: {
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)",
        ring: "0 0 0 1px rgba(100,122,139,0.35), 0 8px 24px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        "kudu-grid":
          "radial-gradient(circle at 1px 1px, rgba(100,122,139,0.15) 1px, transparent 0)",
      },
      backgroundSize: { grid: "22px 22px" },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%,100%": { opacity: 0.35 },
          "50%": { opacity: 0.9 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
