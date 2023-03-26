const path = require('path')
const webpack = require(
  "webpack"
)

const BundleAlalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env) => ({
  mode: env?.development ? 'development' : 'production',
  entry: path.join(__dirname, 'app/app.tsx'),

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app-bundle.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_GMAPS_API_KEY': JSON.stringify(process.env.REACT_APP_GMAPS_API_KEY),
    }),
    env?.analyze && new BundleAlalyzer({analyzerMode: 'static'})
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
  },
})
