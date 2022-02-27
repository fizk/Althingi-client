const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, {
            loader: "css-loader",
            options: {
                // modules: true,
                // importLoaders: 1,
                // localIdentName: "[name]_[local]_[hash:base64]",
                // sourceMap: true,
                // minimize: true
            }
        }],
    },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          publicPath: '/'
        })
    ],
  mode: 'development',
};