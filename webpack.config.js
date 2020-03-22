const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(process.cwd(__dirname, 'build')),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'url-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(process.cwd(__dirname, 'src')),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(process.cwd(__dirname, 'build')),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(process.cwd(__dirname, 'index.html')),
        to: path.resolve(process.cwd(__dirname, 'build')),
      },
      {
        from: path.resolve(process.cwd(__dirname, 'assets', '**', '*')),
        to: path.resolve(process.cwd(__dirname, 'build')),
      },
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
};