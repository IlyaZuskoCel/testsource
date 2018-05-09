const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: ['babel-polyfill', './src/client.js'],
    },
    output: {
        filename: 'js/[name].js',
        publicPath: '/',
        path: '/var/www/app',
        library: '[name]'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=200000'},
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
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
