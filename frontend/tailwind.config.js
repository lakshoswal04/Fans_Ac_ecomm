/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4361EE",
          light: "#4CC9F0",
          dark: "#3A0CA3"
        },
        secondary: {
          DEFAULT: "#7209B7",
          light: "#B5179E",
          dark: "#560BAD"
        },
        accent: {
          DEFAULT: "#F72585",
          light: "#FF85A1",
          dark: "#D61F69"
        },
        success: {
          DEFAULT: "#10B981",
          light: "#6EE7B7",
          dark: "#059669"
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#D97706"
        },
        info: {
          DEFAULT: "#4CC9F0",
          light: "#7DD3FC",
          dark: "#0284C7"
        },
        dark: "#1F2937",
        light: "#F9FAFB",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 10px 25px -5px rgba(67, 97, 238, 0.1), 0 10px 10px -5px rgba(67, 97, 238, 0.04)',
        'hover': '0 20px 25px -5px rgba(67, 97, 238, 0.2), 0 10px 10px -5px rgba(67, 97, 238, 0.1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'slideIn': 'slideIn 0.3s ease-out',
        'slideOut': 'slideOut 0.3s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
} 