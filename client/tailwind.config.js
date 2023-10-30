/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E242D',
        'hover': '#4e4e4e',
        'primary-second': '#F2F4F7',
        'text': '#8B94A2',
        'stroke': '#E2E8F0',
        'whiter': '#F5F7FD',
        'gray-2': '#EFF4FB',
        'orange-2': '#E54f46',
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
      },
      keyframes: {
        slideSearchWindow: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: ' transform: translateY(0);' },
        }
      },
      animation: {
        slideSearchWindow: 'slideSearchWindow 0.5s ease forwards',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

