const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: ['./src/index.js'],
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
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Scout Zoo App',
        template: 'src/index.ejs'
    })]
};
