import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "var(--surface-page)",
        foreground: "var(--text-primary)",

        section: "var(--surface-section)",
        card: "var(--surface-card)",

        muted: {
          foreground: "var(--text-secondary)",
        },

        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",

        danger: {
          DEFAULT: "var(--color-danger)",
        },
        success: {
          DEFAULT: "var(--color-success)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
