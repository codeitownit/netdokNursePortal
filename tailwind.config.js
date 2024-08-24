/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        // 'poppins': ['Poppins', 'sans-serif'],
        // 'quicksand': ['"Quicksand"', 'sans-serif'],
      },
      
      backgroundColor: {
        'custom-blue': '#0E2F59',
      },
      screens: {
        xxs: "320px",
        xsm: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primary: "#0E2F59",
        secondary:"#1fb800de",
        "table-odd": "rgba(27, 71, 129, 0.15)",
        "table-even": "rgba(27, 71, 129, 0.05)",
      },
    },
  },
  plugins: [
   
  ],
}

