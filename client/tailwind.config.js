/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Luxury car-rental palette (deep emerald + warm bronze + ivory) —
        // do not introduce blue/orange/bright saturated colors. Token names
        // kept stable so every existing className repaints automatically.
        cream: {
          DEFAULT: "#faf8f3", // ivory — main background
          dim: "#f4f0e7", // secondary light-section background
        },
        charcoal: {
          DEFAULT: "#0f2e28", // deep forest emerald-black — nav/footer/dark sections
          soft: "#1f3e38", // lifted emerald — slightly lighter shade for layered dark panels
        },
        gold: {
          DEFAULT: "#c6a87c", // soft brass — buttons/accents/borders only
          light: "#e2cba6", // pale brass — hover states/highlights
          dark: "#9e8663", // deeper brass for text-on-light contrast
        },
        ink: "#1c1c1c", // near-black — body text
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "ui-serif", "serif"],
        sans: ["'Manrope'", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: ["1.0625rem", { lineHeight: "1.7" }], // ~17px body copy
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #e2cba6 0%, #c6a87c 55%, #9e8663 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 46, 40, 0.25)",
        "glass-lg": "0 20px 60px -10px rgba(15, 46, 40, 0.45)",
        "gold-glow": "0 0 0 1px rgba(198, 168, 124, 0.35), 0 8px 30px -8px rgba(198, 168, 124, 0.5)",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
