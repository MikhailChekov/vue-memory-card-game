const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');


const isDev = process.env.NODE_ENV === 'development';

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets'
}

const filename = (ext) => {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
}

// -------------------- Plugins -----------------------
const plugins = () => {

    const basePlugins = [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            minify: {
                collapseWhitespace: !isDev
            },
            hash: false
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/${filename('css')}`
        }),
        //For env variables
        new Dotenv(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/${PATHS.assets}/img`,
                    to: `${PATHS.assets}/img`
                }
                // { 
                //     from: `${PATHS.src}/static`,
                //     to: ``
                // },
                // { 
                //     from: `${PATHS.src}/${PATHS.assets}/fonts`,
                //     to: `${PATHS.assets}/fonts`
                // }
            ]
        })
    ]

    if (!isDev) {
        basePlugins.push(
            new ImageMinimizerPlugin({
                minimizerOptions: {
                    // Lossless optimization with custom option
                    // Feel free to experiment with options for better result for you
                    plugins: [
                        ['gifsicle', { interlaced: true }],
                        ['jpegtran', { progressive: true }],
                        ['optipng', { optimizationLevel: 5 }],
                        ['mozjpeg', { quality: 80 }],
                        [
                            'svgo',
                            {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                ],
                            }
                        ]
                    ]
                }
            })
        )
    }

    return basePlugins;
}

module.exports = {
    entry: {
        main: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}/js/${filename('js')}`,
        path: PATHS.dist,
        publicPath: '/'
    },
    externals: {
        paths: PATHS
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    chunks: 'all',
                    test: /node_modules/,
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            // ----------------- js(x) ---------------------
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // ----------------- js(x) ---------------------
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loader: {
                            scss: 'vue-style-loader!css-loader!sass-loader'
                        }
                    }
                }
            },
            // ---------------- Styles -----------------------
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer',
                                    'postcss-combine-media-query'
                                ]
                            }
                        }

                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }

                ]
            },
            // ---------------- images --------------------
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            esModule: false
                        }
                    }
                ]
            },
            // ---------------- Fonts -----------------------
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: plugins(),
    resolve: {
        extensions: ['*', '.js', '.vue', '.scss', '.json'],
        alias: {
            "~": path.resolve(__dirname, 'src/')
        }
    }
}