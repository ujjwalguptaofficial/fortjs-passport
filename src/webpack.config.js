const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const banner = require('./license');
// const { BannerPlugin } = require('webpack');

module.exports = [{
    name: "fort-passport",
    mode: process.env.NODE_ENV || 'development',
    target: "node",
    entry: "./src/index.ts",
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, "./../dist"),
        filename: "lib.js",
        libraryTarget: "commonjs2"
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false,
        nodeEnv: false
    },
    node: {
        global: false,
        __filename: false,
        __dirname: false,
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: [
        // new BannerPlugin(banner)
    ],
    externals: [nodeExternals()]
}];