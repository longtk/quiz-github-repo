/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
      "4k": "2000px",
      mobile: { max: "551px" },
      mobileTable: { max: "1026px" },
    },
  },
  plugins: [],
};
