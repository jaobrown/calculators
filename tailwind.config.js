module.exports = {
  theme: {
    fontFamily: {
      sans: ["Work Sans", "sans-serif"],
      body: ["Work Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "brand-gray-300": "#171819",
        "brand-gray-200": "#4A5568",
        "brand-gray-100": "#A0A0A0",
        "brand-royal-blue": "#111C4E",
        "brand-teal": "#00A19C",
      },
    },
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
}
