/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily : {
            'sans': ['Inter', 'sans-serif'],
        },
       
        extend: {
            colors : {
                myCyan : '#0FB7FF',
                myGreen : '#1EB564'
            }
        },
    },
    plugins: [],
};
