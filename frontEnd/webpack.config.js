var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public');
var APP_DIR = path.resolve(__dirname, 'src/app');

// var BUILD_DIR = path.resolve( 'src/public');
// var APP_DIR = path.resolve( 'src/app');


var config = {
  entry: APP_DIR,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
         test: /\.jsx$/,
        include : APP_DIR,
        loader : 'babel',
      

      }
    ]
  }
};

module.exports = config;
