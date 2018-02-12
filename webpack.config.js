const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    __dirname + '/src/js/index.js',
    __dirname + '/src/less/index.less',
  ],
  output: {
    path: __dirname + '/dist/',
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
        test: [/\.js$/, /\.jsx$/],
        use: ['babel-loader'],
        exclude: [/node_modules/, /public/],
      },
      {
        test: [/\.css$/, /\.less$/],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader'
            },
            'less-loader',
          ]
        })
      },
      {
        test: [/\.png$/, /\.eot$/, /\.ttf$/, /\.otf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        use: ['url-loader?limit=1000'],
      },
    ],
  },
  devServer: {
    inline: true,
    port: 5000,
    contentBase: __dirname,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};