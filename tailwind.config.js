/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#00f0ff',
          purple: '#ff00ff',
          pink: '#ff006e',
          green: '#39ff14',
          yellow: '#ffff00',
        },
        dark: {
          bg: '#0a0e27',
          card: '#151b3a',
          border: '#2a3f6f',
        },
      },
      fontFamily: {
        display: ['Space Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        glow: 'glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        slide: 'slide 0.5s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' },
          '50%': { textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 30px #00f0ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slide: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
