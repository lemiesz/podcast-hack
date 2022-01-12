module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                Lato: ['"Lato"', 'sans-serif'],
                Merriweather: ['"Merriweather"', 'serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
