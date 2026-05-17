/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Light mode: stone palette */
        surface: {
          50: "#fafaf9",    /* stone-50 — light bg */
          100: "#f5f5f4",   /* stone-100 — light card */
          200: "#e7e5e4",   /* stone-200 — light border */
          300: "#d6d3d1",   /* stone-300 */
          400: "#a8a29e",   /* stone-400 — light muted text */
          500: "#78716c",   /* stone-500 */
          600: "#57534e",   /* stone-600 — light secondary text */
          700: "#44403c",   /* stone-700 */
          800: "#292524",   /* stone-800 */
          900: "#1c1917",   /* stone-900 — light text */
          950: "#0c0a09",   /* stone-950 */
        },
      },
      fontFamily: {
        /* saddine.com uses Geist Sans for headings + body, Geist Mono for code */
        sans: ['"Inter"', '"Geist Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"Fira Code"', 'monospace'],
        display: ['"Inter"', '"Geist Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'text-reveal': 'text-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.6s ease forwards',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(120, 113, 108, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(120, 113, 108, 0.2)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'text-reveal': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
