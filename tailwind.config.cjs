/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
      },
      colors: {
        "primary-050": "#FFFBEA",
        "primary-100": "#FFF3C4",
        "primary-200": "#FCE588",
        "primary-300": "#FADB5F",
        "primary-400": "#F7C948",
        "primary-500": "#F0B429",
        "primary-600": "#DE911D",
        "primary-700": "#CB6E17",
        "primary-800": "#B44D12",
        "primary-900": "#8D2B0B",

        "secondary-050": "#E3F8FF",
        "secondary-100": "#B3ECFF",
        "secondary-200": "#81DEFD",
        "secondary-300": "#5ED0FA",
        "secondary-400": "#40C3F7",
        "secondary-500": "#2BB0ED",
        "secondary-600": "#1992D4",
        "secondary-700": "#127FBF",
        "secondary-800": "#0B69A3",
        "secondary-900": "#035388",

        "neutral-050": "#F7F7F7",
        "neutral-100": "#E1E1E1",
        "neutral-200": "#CFCFCF",
        "neutral-300": "#B1B1B1",
        "neutral-400": "#9E9E9E",
        "neutral-500": "#7E7E7E",
        "neutral-600": "#626262",
        "neutral-700": "#515151",
        "neutral-800": "#3B3B3B",
        "neutral-900": "#222222",

        "support-primary-050": "#FFE3E3",
        "support-primary-100": "#FFBDBD",
        "support-primary-200": "#FF9B9B",
        "support-primary-300": "#F86A6A",
        "support-primary-400": "#EF4E4E",
        "support-primary-500": "#E12D39",
        "support-primary-600": "#CF1124",
        "support-primary-700": "#AB091E",
        "support-primary-800": "#8A041A",
        "support-primary-900": "#610316",

        "support-secondary-050": "#EFFCF6",
        "support-secondary-100": "#C6F7E2",
        "support-secondary-200": "#8EEDC7",
        "support-secondary-300": "#65D6AD",
        "support-secondary-400": "#3EBD93",
        "support-secondary-500": "#27AB83",
        "support-secondary-600": "#199473",
        "support-secondary-700": "#147D64",
        "support-secondary-800": "#0C6B58",
        "support-secondary-900": "#014D40",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
