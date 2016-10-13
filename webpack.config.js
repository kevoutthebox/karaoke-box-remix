const webpack = require('webpack');
const path = require('path');

// NODE_ENV set to production in heroku and defaulting to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: [
    './public/src/index.jsx',
  ],
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react', 'es2015', 'stage-1'],
      },
    }],
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'inline-sourcemap' : null,
  plugins: process.env.NODE_ENV !== 'production' ? [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin()] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.Occurence.Plugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
  resolve: {
    root: __dirname,
    //  this allows up to use aliases when we require from the following folders
    modulesDirectories: [
      'node_modules',
    ],
    extensions: ['', '.js', '.jsx'],
  },

  //excluding sourcemaps when on heroku
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
}
