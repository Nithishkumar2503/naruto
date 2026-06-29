/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        secondary: "#111111",
        card: "#151515",
        accent: "#FF2A2A",
        "accent-secondary": "#FF6B00",
        gold: "#FFD166",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B0B0B0",
        muted: "#777",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(255, 42, 42, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 42, 42, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};
