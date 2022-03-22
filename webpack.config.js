const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

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
        use: [MiniCssExtractPlugin.loader, "css-loader", {
            // loader: "css-loader",
            loader: 'postcss-loader',
            options: {
                postcssOptions: {

                    plugins: [
                        { "postcss-nested": { preserveEmpty: true } },
                    ]
                },
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
        new CopyPlugin({
            patterns: [
                { from: "src/manifest.json", to: "manifest.json" },
            ],
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          publicPath: '/',
          scriptLoading: "defer",
        })
    ],
  mode: 'development',
};
