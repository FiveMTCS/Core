/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/web/src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist/web'),
        filename: 'index.bundle.js',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            components: path.resolve(__dirname, 'src/web/src/components'),
            hooks: path.resolve(__dirname, 'src/web/src/hooks'),
            others: path.resolve(__dirname, 'src/web/src/others'),
            resources: path.resolve(__dirname, 'src/web/src/resources'),
            translations: path.resolve(__dirname, 'src/web/src/translations'),
            utils: path.resolve(__dirname, 'src/web/src/utils'),
        },
        cacheWithContext: false,
    },
    devServer: { contentBase: path.join(__dirname, 'src/web') },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/web/public', 'index.html'),
        }),
    ],
};
