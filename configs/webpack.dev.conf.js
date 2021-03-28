const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const ESLintPlugin = require('eslint-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new ESLintPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: ['vendor.js']
        })
    ],
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        // open: 'Google Chrome',
        overlay: true,
        port: 8800
    }
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
})
