/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lspd: {
          dark: '#0f172a',
          blue: '#2563eb',
          gold: '#eab308'
        }
      }
    },
  },
  plugins: [],
}