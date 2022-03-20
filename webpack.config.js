const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
  entry: path.resolve(__dirname, './index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    filename: '[name].js',
     path: path.resolve(__dirname, 'dist'),
     clean: true
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
  },
};