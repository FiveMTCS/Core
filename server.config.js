/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/server/main.ts',
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
            types: path.resolve(__dirname, 'src/server/types'),
            libraries: path.resolve(__dirname, 'src/server/libraries'),
            config: path.resolve(__dirname, 'src/config'),
            mixed: path.resolve(__dirname, 'src/mixed'),
            TcsModules: path.resolve(__dirname, 'src/server/modules'),
        },
        cacheWithContext: false,
    },
    output: {
        filename: 'main.js',
        path: __dirname + 'dist/server/',
    },
    externals: nodeModules,
};
