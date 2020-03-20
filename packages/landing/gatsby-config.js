const path = require('path');

module.exports = {
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-postcss',
        'gatsby-plugin-typescript',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
                endpoint:
                    'https://hostyhosting.us19.list-manage.com/subscribe/post?u=abce8b8363c66f37f79b67e01&amp;id=8aa6403688',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: path.join(__dirname, 'src', 'images'),
            },
        },
    ],
};
