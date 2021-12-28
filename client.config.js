/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');

module.exports = {
    entry: './src/client/main.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            libraries: path.resolve(__dirname, 'src/client/libraries'),
            config: path.resolve(__dirname, 'src/config'),
            mixed: path.resolve(__dirname, 'src/mixed'),
            modules: path.resolve(__dirname, 'src/client/modules'),
        },
        cacheWithContext: false,
    },
    output: {
        filename: 'main.js',
        path: __dirname + 'dist/client/',
    },
};
