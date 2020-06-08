const path = require('path');

// If you want webpack own html web pack then in terminal: npm i html-webpack-plugin --save-dev.

module.exports = {
    entry: ['babel-polyfill', './src-webpack/index.js'],
    output: {
        path: path.resolve(__dirname, 'public/assets/'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './public'
    },
    plugins: [
        // Insert New Plugins Here: e.g: html-webpack-plugin
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};
