/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        headhunter: {
          primary: "#E02735",
          neutral: "#292A2B",
          "neutral-content": "#7E7E7E",
          "base-100": "#222224",
          "base-200": "#1E1E1F",

          "--rounded-box": "0", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "0", // border radius rounded-badge utility class, used in badges and similar
        },
      },
    ],
  },
}