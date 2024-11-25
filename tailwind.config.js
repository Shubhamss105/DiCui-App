/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors for the premium dark theme
        background: '#1A1A1A', // Midnight Black Mix
        primary: '#FFD700',    // Golden Yellow for primary buttons
        secondary: '#37474F',  // Smoky Blue for secondary buttons
        accent: '#E63946',     // Crimson Red for alerts and notifications
        success: '#50C878',    // Emerald Green for success messages
        highlight: '#6A0DAD',  // Royal Purple for key highlights
        text: {
          primary: '#EDEDED',   // Platinum White for primary text
          secondary: '#C0C0C0', // Muted Silver for secondary text
          accent: '#D4AF37',    // Light Gold for header or accent text
        },
        button: {
          primary: '#FFD700',   // Primary button color (Golden Yellow)
          secondary: '#4F4F4F', // Secondary button color (Steel Gray)
        },
      },
    },
  },
  plugins: [],
};
