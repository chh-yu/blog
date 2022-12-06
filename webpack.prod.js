const path = require('path')
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://localhost:5500/'
        publicPath: 'https://blog.heliopolis.top/'
      },
})