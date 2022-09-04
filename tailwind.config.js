/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./componenst/*.{js,jsx,ts,tsx}",
    "./componenst/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
