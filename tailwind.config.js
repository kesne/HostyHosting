const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        borderWidth: ['responsive', 'last', 'hover', 'focus'],
        margin: ['responsive', 'last'],
    },
    plugins: [],
    plugins: [require('@tailwindcss/ui')],
};
