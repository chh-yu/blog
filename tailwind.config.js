// tailwind.config.js
module.exports = {
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '192': '48rem'
      },
      lineHeight: {
        '3.5rem': '3.5rem',
        '4rem': '4rem'
      },
      keyframes: {
        arrow: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            opacity: '1'
          },
          '50%': {
            transform: 'translateY(0)',
            opacity: '0'
          }
        }
      },
      animation: {
        'arrow-animation': "arrow 2s ease-in-out infinite "
      },
      
    },
  },
  variants: {},
  plugins: [],
}