/** @type {import('tailwindcss').Config} */
export default {
  // tell Tailwind to look for a `.dark` class
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
