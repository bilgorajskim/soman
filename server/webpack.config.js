const path = require('path')
const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const pjson = require('./package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')

// Relative paths function
const pathsConfig = function (appName) {
  this.app = './' + (appName || pjson.name)

  return {
    app: this.app,
    templates: this.app + '/templates',
    entries: this.app + '/frontend',
    css: this.app + '/static/css',
    sass: this.app + '/static/sass',
    fonts: this.app + '/static/fonts',
    images: this.app + '/static/images',
    js: this.app + '/static/js',
    bundles: this.app + '/static/webpack_bundles'
  }
}

const paths = pathsConfig()

let plugins = [
  new BundleTracker({filename: './webpack-stats.json'}),
  new ExtractTextPlugin('[name]-[hash].css'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
  }),
  new CleanWebpackPlugin([paths.bundles], {
    root: __dirname,
    verbose: true,
    dry: false
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = {
  context: __dirname,
  entry: {
    main: [
      paths.entries + '/main.js',
      paths.entries + '/main.scss'
    ],
    panel: [
      'babel-polyfill',
      paths.entries + '/app/app.js'
    ]
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './node_modules/react-icons/fa'), path.resolve(__dirname, './node_modules/react-icons/go')]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=9990000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.css/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  output: {
    path: path.resolve(paths.bundles),
    filename: '[name]-[hash].js'
  },

  plugins
}
