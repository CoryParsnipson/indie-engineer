const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
      colors: {
        'cream': {
          50:  '#f8f7eb',
          100: '#ebe9ce',
          200: '#d9d7b7',
          300: '#dbcda0',
          400: '#caa85f',
          600: '#775711',
          800: '#563b01',
        },
        'emerald': {
          100: '',
          500: '#6ab658',
          700: '#38762a',
          800: '#226514',
        },
      },
      fontFamily: {
        'title': ['"Oswald"', 'Trebuchet MS', 'Helvetica', ...defaultTheme.fontFamily.sans],
        'serif': ['"Slabo 27px"', 'Garamond', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        '4.5xl': '2.7rem',
        '5xl': '3.1rem',
      },
      letterSpacing: {
        markdown: '0.015rem',
      },
    }
	},

	plugins: [forms, typography]
};

module.exports = config;
