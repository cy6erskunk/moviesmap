const path = require('path')

const BundleAlalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LicenseChecker = require('@jetbrains/ring-ui-license-checker')

module.exports = env => ({
  mode: env && env.development ? 'development' : 'production',
  entry: path.join(__dirname, 'app/app.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app-bundle.js',
  },

  plugins: [
    env && env.analyze && new BundleAlalyzer({analyzerMode: 'static'}),
    env &&
      env.licenses &&
      new LicenseChecker({
        filename: 'third-party-licenses.txt',
        format: params =>
          params.modules
            .map(
              mod => `${mod.name} (${mod.url})
${mod.license.name} (${mod.license.url})`,
            )
            .join('\n\n'),
        // stackframe has wrong license field in 0.3.1
        exclude: [/stackframe/],
        customLicenses: [
          {
            name: 'stackframe',
            version: '0.3.1',
            url: 'https://www.npmjs.com/package/stackframe',
            license: {
              name: 'Unlicense',
              url: 'http://unlicense.org/',
            },
          },
        ],
        surviveLicenseErrors: true,
      }),
  ].filter(Boolean),

  module: {
    rules: [
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
