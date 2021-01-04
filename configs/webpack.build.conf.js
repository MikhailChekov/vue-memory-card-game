const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            }),
            new TerserPlugin()
        ]
    }
})

module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
})
