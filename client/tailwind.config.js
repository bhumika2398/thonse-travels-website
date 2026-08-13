/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Luxury car-rental palette (champagne + onyx + pearl) — do not
        // introduce blue/orange/bright saturated colors. Token names kept
        // stable so every existing className repaints automatically.
        cream: {
          DEFAULT: "#f8f7f4", // pearl — main background
          dim: "#f2efe8", // secondary light-section background
        },
        charcoal: {
          DEFAULT: "#0a0a0a", // near-black — nav/footer/dark sections
          soft: "#1a1a1a", // onyx — slightly lifted shade for layered dark panels
        },
        gold: {
          DEFAULT: "#c9a876", // champagne — buttons/accents/borders only
          light: "#e0c9a0", // champagne-light — hover states/highlights
          dark: "#a0865e", // deeper champagne for text-on-light contrast
        },
        ink: "#2b2b2b", // graphite — body text
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "ui-serif", "serif"],
        sans: ["'Manrope'", "system-ui", "sans-serif"],
      },
      fontSize: {
        base: ["1.0625rem", { lineHeight: "1.7" }], // ~17px body copy
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #e0c9a0 0%, #c9a876 55%, #a0865e 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(10, 10, 10, 0.25)",
        "glass-lg": "0 20px 60px -10px rgba(10, 10, 10, 0.45)",
        "gold-glow": "0 0 0 1px rgba(201, 168, 118, 0.35), 0 8px 30px -8px rgba(201, 168, 118, 0.5)",
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
