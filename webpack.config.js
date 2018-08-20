const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = [
    {
        entry: {
            global: './app/index.ts'
        },
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, './wwwroot/js/'),
            sourceMapFilename: 'index.js.map'
        },
        devtool: "source-map",
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                },
				 {
                    enforce: "pre",
                    test: /\.tsx$/,
                    use: 'source-map-loader',
                    exclude: /node_module/
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise'
            })
        ]
    },
     {
        entry: {
            global: './app/index.tsx'
        },
        output: {
            filename: 'react-index.js',
            path: path.resolve(__dirname, './wwwroot/js/'),
            sourceMapFilename: 'react-index.js.map'
        },
        devtool: "source-map",
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                },
				 {
                    enforce: "pre",
                    test: /\.tsx$/,
                    use: 'source-map-loader',
                    exclude: /node_module/
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                Promise: 'es6-promise'
            })
        ]
    }
    
    // {
    //     entry: {
    //         Home: './Sass/Main.scss'
    //     },
    //     output: {
    //         filename: 'main.css',
    //         path: path.resolve(__dirname, './static/')
    //     },
    //     module: {

    //         rules: [
    //             /*
    //             your other rules for JavaScript transpiling go in here
    //             */
    //             { // regular css files
    //                 test: /\.css$/,
    //                 loader: ExtractTextPlugin.extract('css-loader?importLoaders=1'),
    //             },
    //             { // sass / scss loader for webpack
    //                 test: /\.(sass|scss)$/,
    //                 loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    //             },
    //             {
    //                 test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //                 loader: 'file-loader',
    //             }
    //         ]
    //     },
    //     plugins: [
    //         new ExtractTextPlugin({ // define where to save the file
    //             filename: 'main.css',
    //             allChunks: true,
    //         }),
    //         new LiveReloadPlugin()
    //     ]
    // }
];

module.exports = config;