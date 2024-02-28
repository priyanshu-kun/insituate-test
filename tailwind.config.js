/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      'xxs': '8px',
      'xs': '12px',
      'sm': '0.8rem',
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      '6xl': '4.052rem',
      '7xl': '5.052rem',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
    },
    extend: {
      rotate: {
        '140': '140deg'
      },
      lineHeight: {
        '12': '46px'
      },
      spacing: {
        '500px': '500px'
      },
      colors: {
        'primary-accent-color': 'var(--primary-accent-color)',
        'secondary-accent-color': 'var(--secondary-accent-color)',
        'button-hover-color': 'var(--button-hover-color)',
      },
      boxShadow: {
        'llm_card_shadow': '0 0 8px rgba(51, 99, 174, 0.2)',
        'workspace_shadow': 'rgba(226, 233, 244, 0.8) 0px 2px 5px -1px, rgba(51, 99, 174, 0.2) 0px 1px 3px -1px'
      },
      margin: {
        '78px': '78px'
      },
      width: {
        '2px': '2px',
      },
      zIndex: {
        '1000': '1000',
        '10000': '10000',
        '9999999999': '9999999999'
      },
      minWidth: {
        '420px': '420px'
      }
    },
  },
  plugins: [],
};
