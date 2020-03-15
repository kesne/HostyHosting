// 'ant' was added to the whitelist in purge css so that ant-design styles are
// not removed from the final css.

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production'
            ? {
                  '@fullhuman/postcss-purgecss': {
                      content: ['./components/**/*.tsx', './pages/**/*.tsx'],
                      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                      whitelistPatterns: [/ant/]
                  }
              }
            : {})
    }
};
