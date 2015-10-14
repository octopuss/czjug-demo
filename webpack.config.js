"use strict";
var webpack = require('webpack');
var cleanPlugin = require('clean-webpack-plugin');


var plugins = [new cleanPlugin(['build'])];
module.exports = {
    entry: [
        './slides-loader.js'
    ],
    output: {
        path: __dirname + '/build',
        filename: 'slides-loader.js',
        publicPath: 'build/'
    },
    module: {
        loaders: [
           { test: /\.css$/, loader: "style!css"},
            {test: /\.((svg)|(woff)|(woff)|(ttf)|(eot)|(jpg))$/, loader: 'file-loader', query: {name: '[name]\.[ext]'}} // extracts fonts from css files and adds them to distribution folder
        ]
    },
    plugins: plugins

};