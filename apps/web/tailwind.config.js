/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'd4ia-primary': '#2563eb',
        'd4ia-secondary': '#7c3aed',
        'd4ia-accent': '#ec4899',
      },
    },
  },
  plugins: [],
}
