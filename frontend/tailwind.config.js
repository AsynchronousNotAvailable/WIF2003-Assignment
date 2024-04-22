const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
    theme: {
        colors: {
            'button-blue': '#5489fc',
            'border-grey': '#e0e2e7'
        },
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            }
        },
    },
    plugin: [flowbite.plugin()],
};
