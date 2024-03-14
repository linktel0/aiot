//const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src1/**/*.{js,jsx,ts,tsx}',
    './screen/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './screen/**/*.html',
    './screen/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
    './public/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        light: '#fafafafa',
        DEFAULT: '#DB3022',
        dark: '#475569',
      },
      secondary: {
        DEFAULT: '#9B9B9B',
        dark: '#c4c4c4c4',
        light: '#dadadada',
      },
    },
    extend: {
      colors: {
        error: "#F01F0E",
        success: "#2AA952",
        darkColor: "#2A2C36",

        red: {
          DEFAULT: '#DB3022',
          darker: '#bf1c0a',
          lighter: '#f75546',
        },
        gray: {
          DEFAULT: '#9B9B9B',
          darker: '#c4c4c4',
          lighter: '#e5e7eb',
        },
        white:'#fafafafa',
      },
    },
  },
  plugins: [
    function ({addComponents}) {
      const layouts = {
        '.between-x': {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '.between-y': {
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '.center-x': {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.center-y': {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.evenly-x': {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
        '.evenly-y': {
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        },
      };

      const buttons = {
        '.btn': {
          backgroundColor: '#fff',
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-primary': {
          backgroundColor: '#4299e1',
          fontWeight: '600',
        },
        '.btn-secondary': {
          backgroundColor: '#667eea',
          fontWeight: '100',
        },
      };

      const texts = {
        '.text': {
          backgroundColor: '#fff',
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.text-h': {
          color: '#4299e1',
          fontSize: '24px',
          fontWeight: '600',
        },
        '.text-h-1': {
          backgroundColor: '#667eea',
          fontWeight: '100',
        },
        '.description': {
          fontFamily: 'Ubuntu-Regular',
          fontSize: 14,
          color: 'black',
          opacity: 0.8,
        },
        '.body2': {
          fontFamily: 'Ubuntu-Medium',
          fontSize: 16,
          color: 'black',
        },
      };

      addComponents(buttons);
      addComponents(layouts);
      addComponents(texts);
    },
  ],
};
