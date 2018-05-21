const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: ["babel-polyfill", 'whatwg-fetch', './src/client.js'],
    },
    output: {
        filename: 'js/[name].js',
        publicPath: '/',
        path: '/var/www/app',
        library: '[name]'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'stage-2', 'react-app'],
                        babelrc: false
                    }
                }
            },

            {test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader?name=images/[name]-[sha512:hash:base64:7].[ext]'},
            {
                test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name]-[sha512:hash:base64:7].[ext]'
            },

            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            }

        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './src/assets', to: 'public'},
            //         {from: './src/assets/favicon', to: ''}
        ]),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        new HtmlWebpackPlugin({
            title: 'Scout Zoo App',
            template: 'src/index.ejs',
            hash: true,
            cache: false
        })
    ]
};
