/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"
 ],
  safelist: [
  'bg-red-600', 'text-white', 'rounded-lg', 'text-center',
  'container', 'max-w-7xl', 'shadow-lg', 'hover:bg-red-700',
  'bg-white', 'text-gray-600', 'text-primary', 'bg-gradient-to-b',
  'from-primary/5', 'to-white', 'bg-gray-50', 'bg-blue-100', 'bg-red-100'
],
  theme: {
    extend: {
      colors: {
        primary: '#4169E1',
        secondary: '#FF6B00',
        accent: '#FFD700',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        light: '#F3F4F6',
        dark: '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}