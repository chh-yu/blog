const path = require('path')
const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = merge(common, {
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'http://localhost:5500/'
        publicPath: 'https://chyu123.top/blog/'
      },
})