/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "background": "#ECF1F3",
        "primary": "#1A91DB",
        "secondary": "#F5F5F5",
        "primary-foreground": "#FEF2F2",
        "secondary-foreground": "#20232A"
      }
    },
  },
  plugins: [],
}

