const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'faker',
  'lodash',
  'react',
  'react-redux',
  'react-dom',
  'react-input-range',
  'redux-form',
  'redux',
  'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    // everytime we make a change, we will have a new hash
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // saves dependencies only in vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      // manifest gives browsers more understanding if vendor has changed (busting cache)
      names: ['vendor', 'manifest']
    }),
    // adds script references to index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
