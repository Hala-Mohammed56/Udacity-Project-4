// Import required packages
const path = require('path'); 
const webpack = require('webpack'); 
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

// Export Webpack configuration
module.exports = {
    
    entry: './src/client/index.js',

    mode: 'development',

    devtool: 'source-map',

    stats: 'verbose',

    // Define rules 
    module: {
        rules: [
            {
                // Rule for JavaScript files
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
            {
                // Rule for SCSS files
                test: /\.scss$/, 
                use: [ 'style-loader', 'css-loader', 'sass-loader' ] 
            }
        ]
    },

    // Define plugins 
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html", 
            filename: "./index.html", 
        }),
        new CleanWebpackPlugin({
            dry: true, 
            verbose: true, 
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ],

    // Webpack Dev Server config
    devServer: {
        port: 3000, 
        allowedHosts: 'all'
    }
};
