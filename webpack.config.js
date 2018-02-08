const path = require('path')

const BundleAlalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = env => ({
  entry: path.join(__dirname, 'app/app.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app-bundle.js',
  },

  plugins: env && env.analyze ? [new BundleAlalyzer({analyzerMode: 'static'})] : [],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    inline: true,
  },
})
