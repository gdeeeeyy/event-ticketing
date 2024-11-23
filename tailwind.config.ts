import { type Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this matches your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animate'), // Make sure this line is present
  ],
};

export default config;
