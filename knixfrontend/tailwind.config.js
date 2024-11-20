/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        apptheme : "#e0e0e0",
      },
      colors:{
        textclr : "#555",
      },
      boxShadow: {
        neusm:
          '.5vh .5vh 1vh #bebebe, -.5vh -.5vh 1vh #ffffff',
          neusmrev:
          'inset .4vh .4vh .5vh #bebebe, inset -.4vh -.4vh .5vh #ffffff',
      },

      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', },
          '100%': { transform: 'translateX(0)',  },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', },
          '100%': { transform: 'translateX(0)',  },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', },
          '100%': { transform: 'translateY(0)',  },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', },
          '100%': { transform: 'translateY(0)',  },
        },
        sidegrow: {
          '0%': { width: '0' },
          '100%': { width: '28vw' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft .5s ease-out forwards',
        slideInRight: 'slideInRight .5s ease-out forwards',
        slideInUp: 'slideInUp .5s ease-out forwards',
        slideInDown: 'slideInDown .5s ease-out forwards',
        sidegrow: 'sidegrow .5s ease-out forwards',
      },
    },
  },
  plugins: [],
}