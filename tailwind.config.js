module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        textColor: theme => ({
            ...theme('colors'),
            'skyBlue': '#C3E0E5',
            'darkBlue': '#274472',
            'blueGray': '#5885AF',
            'midBlue': '#41729F'
        }),
        backgroundColor: theme => ({
            ...theme('colors'),
            'sky-blue': '#C3E0E5',
            'dark-blue': '#274472',
            'blue-gray': '#5885AF',
            'mid-blue': '#41729F'
        }),
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
