/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0F172A',
        'brand-blue-dark': '#020617',
        'brand-green': '#10B981',
        'brand-green-light': '#34D399',
        'brand-cream-light': '#F8FAFC',
        'brand-cream-dark': '#94A3B8',
        'space-dark': '#020617',
        'space-light': '#0F172A',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
