/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9fe',
          300: '#9cbafd',
          400: '#6891fc',
          500: '#3b62f6',
          600: '#2547eb', // Deep Gov Royal Blue / Indigo
          700: '#1d35d8',
          800: '#1e29b0',
          900: '#0f172a',
          950: '#0b132b',
        },
        saffron: {
          50: '#fffbf0',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Accent Gold / Saffron
          600: '#d97706',
          700: '#b45309',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        navy: {
          800: '#1e293b',
          900: '#0f172a',
          950: '#0b132b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'glow-brand': '0 0 25px -5px rgba(37, 71, 235, 0.3)',
        'glow-saffron': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
      }
    },
  },
  plugins: [],
}
