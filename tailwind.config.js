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
        primary: {
          50: "#EBF2FA",
          100: "#C7DBF0",
          200: "#A3C3E6",
          300: "#7FACDC",
          400: "#5B94D2",
          500: "#4586CC",
          600: "#2D67A4",
          700: "#235080",
          800: "#193A5C",
          900: "#0F2338",
          950: "#050D14",
        },
        secundary: {
          50: "#EBF9FA",
          100: "#C7EFF0",
          200: "#A3E5E6",
          300: "#7FDADC",
          400: "#5BD0D2",
          500: "#45CACC",
          600: "#2DA2A4",
          700: "#237F80",
          800: "#195B5C",
          900: "#0F3738",
          950: "#051414"

        },
        medium: {
          50: "#EBEBFA",
          100: "#C8C7F0",
          200: "#A4A3E6",
          300: "#807FDC",
          400: "#5D5BD2",
          500: "#4745CC",
          600: "#2F2DA4",
          700: "#252380",
          800: "#1A195C",
          900: "#100F38",
          950: "#060514"
        },
        complementary: {
          50: "#FAF2EB",
          100: "#F0DCC7",
          200: "#E6C5A3",
          300: "#DCAF7F",
          400: "#D2985B",
          500: "#CC8B45",
          600: "#A46B2D",
          700: "#805323",
          800: "#5C3C19",
          900: "#38240F",
          950: "#140D05"
        },
        danger: {
          50: "#FAEBEB",
          100: "#F0C8C7",
          200: "#E6A4A3",
          300: "#DC807F",
          400: "#D25D5B",
          500: "#CC4745",
          600: "#A42F2D",
          700: "#802523",
          800: "#5C1A19",
          900: "#38100F",
          950: "#140605"
        },
        warning: {
          50: "#F9FAEB",
          100: "#EFF0C7",
          200: "#E5E6A3",
          300: "#DADC7F",
          400: "#D0D25B",
          500: "#CACC45",
          600: "#A2A42D",
          700: "#7F8023",
          800: "#5B5C19",
          900: "#37380F",
          950: "#141405"
        },
        "background-light": "#EBF2FA",
        "background-dark": "#050D14",
        "dark": "#0E2539"
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

