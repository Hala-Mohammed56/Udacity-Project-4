// Import required packages
const path = require('path'); 
const webpack = require('webpack'); 
const HtmlWebPackPlugin = require("html-webpack-plugin"); 
const WorkboxPlugin = require('workbox-webpack-plugin'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Export Webpack configuration
module.exports = {
    entry: './src/client/index.js',

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
               
                test: /\.scss$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader' 
                ] 
            }
        ]
    },

    // Define plugins 
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html", 
            filename: "./index.html", 
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css" 
        }),
        // Generates a service worker
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true, 
            skipWaiting: true 
        })
    ],

    // Output configuration for bundled files
    output: {
        path: path.resolve(__dirname, 'dist'), 
        filename: '[name].[contenthash].js'
    },

    // Optional: Webpack Dev Server (not typically used in production)
    devServer: {
        port: 3000, 
        allowedHosts: 'all' 
    }
};
