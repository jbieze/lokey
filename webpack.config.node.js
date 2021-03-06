var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./frontend/lokey.jsx",
  output: {
    path: path.resolve(__dirname, 'backend-nodejs', 'src', "client", "js"),
    //path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/, /\.png?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: [".js", ".jsx", "*"]
  }
};
