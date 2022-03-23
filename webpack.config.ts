// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path')

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const BundleAlalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const LicenseChecker = require('@jetbrains/ring-ui-license-checker')

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = (env: any) => ({
  mode: env && env.development ? 'development' : 'production',
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
  entry: path.join(__dirname, 'app/app.js'),

  output: {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    path: path.join(__dirname, 'public'),
    filename: 'app-bundle.js',
  },

  plugins: [
    env && env.analyze && new BundleAlalyzer({analyzerMode: 'static'}),
    env &&
      env.licenses &&
      new LicenseChecker({
        filename: 'third-party-licenses.txt',
        format: (params: any) => params.modules
          .map(
            (mod: any) => `${mod.name} (${mod.url})
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
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__dirname'.
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
  }
})
