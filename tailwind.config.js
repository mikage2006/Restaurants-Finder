/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        "primary-dark": "#357ABD",
        secondary: "#50E3C2",
        accent: "#F5A623",
        background: "#F8F9FA",
        text: "#333333",
        error: "#E74C3C",
      },
      scale: {
        102: "1.02",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
