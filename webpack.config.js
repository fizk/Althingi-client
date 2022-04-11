const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const crypto = require('crypto')

module.exports = (env, argv) => ({
  entry: {
      bundle: { import: './src/index.tsx', filename: 'bundle.js' } ,
      sw: { import: './src/sw.ts', filename: 'sw.js' },
    },
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
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(argv.mode === 'production'),
            VERSION: JSON.stringify(process.env.npm_package_version),
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/manifest.json", to: "manifest.json" },
            ],
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          inject: false,
          templateParameters: {
              mode: argv.mode,
              hash: (source) => crypto.createHash('md5').update(source).digest("hex")
          }
        })
    ],
  mode: 'development',
});
