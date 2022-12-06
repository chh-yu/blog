const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Seth ·',
      template: './public/index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/,
        
      },
      {
        test: /\.(png|jpg|git|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          esModule: false,
          outputPath: 'imgs/'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: '@mdx-js/loader'
          }
        ]
      }
    ]
  }
}