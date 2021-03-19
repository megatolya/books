const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = {
  watch: true,
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
};

module.exports = [
  {
    ...common,
    entry: ['./src/main.ts'],
    target: 'node',
    output: {
      path: path.join(__dirname, 'server-dist'),
      filename: 'server.js',
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/i,
          use: ['null-loader'],
        },
      ],
    },
  },
  {
    ...common,
    entry: ['./src/client.tsx'],
    target: 'web',
    output: {
      path: path.join(__dirname, 'client-dist'),
      filename: 'client.js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'app.css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
];
