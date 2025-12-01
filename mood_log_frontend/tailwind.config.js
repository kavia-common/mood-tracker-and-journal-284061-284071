/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "#10B981",
        secondary: "#F59E0B",
        success: "#10B981",
        error: "#EF4444",
        background: "#F0FDF4",
        surface: "#FFFFFF",
        text: "#374151"
      },
      fontFamily: {
        display: ['ui-rounded', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        fun: "1rem"
      },
      boxShadow: {
        neon: "0 0 10px rgba(16,185,129,0.6), 0 0 20px rgba(245,158,11,0.4)"
      },
      gradientColorStops: {
        'fun-start': '#34D399',
        'fun-mid': '#FBBF24',
        'fun-end': '#F87171'
      }
    }
  },
  plugins: []
};
