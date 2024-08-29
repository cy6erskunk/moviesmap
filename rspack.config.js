const path = require('path')
const rspack = require('@rspack/core')

module.exports = (env) => ({
  mode: env?.development ? 'development' : 'production',
  entry: path.join(__dirname, 'app/app.tsx'),

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app-bundle.js',
  },

  plugins: [
    new rspack.DefinePlugin({
      'process.env.REACT_APP_GMAPS_API_KEY': JSON.stringify(process.env.REACT_APP_GMAPS_API_KEY),
    }),
  ],

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
