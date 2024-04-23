const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
    theme: {
        fontFamily : {
            'sans': ['Inter', 'sans-serif'],
        },
       
        extend: {
            colors: {
                button:{
                    100: '#5489fc',
                },
                border:{
                    100: '#e0e2e7',
                },
                myCyan : '#0FB7FF',
                myGreen : '#1EB564'
            },
        },
       
    },
    plugin: [flowbite.plugin(), require("daisyui")],
};