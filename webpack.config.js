var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    libraryTarget: "umd",
    library: "react-leaflet-demo",
    path: __dirname + '/dist/',
    filename: 'react-leaflet-demo.js',
    umdNamedDefine: true
  },
  node: {
    fs: "empty"
  },
  externals: [
        {
            './cptable': 'var cptable'
        }
  ],
  // this gets rid of a warning spit out by webpack
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', './app']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        enforce: 'pre'
      },
      // these are needed for leaflet css files
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      },
      // these are for font awesome
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])+$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])+$/,
        loader: "file-loader"
      },
      // this is babel
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [],
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      /*{
        test: /.js$/,
        loader: 'webpack-replace',
        query: {
          search: 'process.env.NODE_ENV',
          replace: '"production"'
        }
      }*/
    ]
  },
};
