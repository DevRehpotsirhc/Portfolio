/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4586CC",
        secundary: "#45CACC",
        medium: "#4745CC",
        complementary: "#CC8B45",
        danger: "#CC4745",
        warning: "#CACC45",
        "background-light": "#EBF2FA",
        "background-dark": "#050D14",
      },
      fontFamily: {
        display: ["Inter", 'system-ui', 'font-sans', "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
}

