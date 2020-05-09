const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'none' : 'inline-source-map',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-typescript',
                                [
                                    '@babel/preset-env',
                                    {
                                        // Allow importing core-js in entrypoint and use browserlist to select polyfills
                                        useBuiltIns: 'entry',
                                        // Set the corejs version we are using to avoid warnings in console
                                        corejs: 3,
                                        // Do not transform modules to CJS
                                        modules: false,
                                        // Exclude transforms that make all code slower
                                        exclude: ['transform-typeof-symbol'],
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                            plugins: [
                                !isProd && 'react-refresh/babel',
                                [
                                    '@babel/plugin-transform-runtime',
                                    {
                                        corejs: 3,
                                        useESModules: true,
                                    },
                                ],
                            ].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|woff2|woff)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        !isProd && new ReactRefreshWebpackPlugin({ disableRefreshCheck: true }),
    ].filter(Boolean),
    watch: !isProd,
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 3000,
        disableHostCheck: true,
        historyApiFallback: true,
    },
};
