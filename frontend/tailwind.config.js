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
    plugins: [flowbite.plugin(), require("daisyui")],

    daisyui: {
        themes: [], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "", // name of one of the included themes for dark mode
        base: false, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: "*", // The element that receives theme color CSS variables
      },
};