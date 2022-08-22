const path = require('path')
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: "development",
    devServer: {
        watchFiles: './dist',
        hot: true,
        historyApiFallback: {
            rewrite: [
                { from: /[\w]*/, to: '/index.html' }
            ]
        }
    },
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'https://chyu123.top/blog/'
        // publicPath: 'http://localhost:5500/'
        publicPath: 'http://localhost:8080/'
      },
})