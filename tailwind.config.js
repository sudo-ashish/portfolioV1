/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        obsidian: '#09090b',
        surface: '#0e0e11',
        amber: {
          400: '#e5a93b',
          500: '#d99726',
        },
        cyan: {
          400: '#7dd3fc',
          500: '#38bdf8',
        },
      },
      boxShadow: {
        machined: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 16px 36px -12px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
