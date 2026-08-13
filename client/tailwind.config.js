/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Exact luxe palette — do not introduce blue/orange/bright saturated colors.
        cream: {
          DEFAULT: "#f7f3ec", // main background
          dim: "#efe8da", // secondary light-section background
        },
        charcoal: {
          DEFAULT: "#1c1f1a", // deep charcoal-forest — nav/footer/dark sections
          soft: "#242820", // slightly lifted shade for layered dark panels
        },
        gold: {
          DEFAULT: "#b8935f", // muted gold — buttons/accents/borders only
          light: "#dcbb85", // lighter gold — hover states/highlights
          dark: "#8f7248", // deeper gold for text-on-light contrast
        },
        ink: "#2b2f28", // body text
      },
      fontFamily: {
        display: ["'Fraunces'", "ui-serif", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: ["1.0625rem", { lineHeight: "1.7" }], // ~17px body copy
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #dcbb85 0%, #b8935f 55%, #8f7248 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(28, 31, 26, 0.25)",
        "glass-lg": "0 20px 60px -10px rgba(28, 31, 26, 0.45)",
        "gold-glow": "0 0 0 1px rgba(184, 147, 95, 0.35), 0 8px 30px -8px rgba(184, 147, 95, 0.5)",
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
