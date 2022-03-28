import path from 'path'

// @ts-expect-error Could not find a declaration file for module
import {BundleAnalyzerPlugin as BundleAlalyzer} from 'webpack-bundle-analyzer'
// @ts-expect-error Could not find a declaration file for module
import LicenseChecker from '@jetbrains/ring-ui-license-checker'

module.exports = (env: any) => ({
  mode: env && env.development ? 'development' : 'production',
  entry: path.join(__dirname, 'app/app.tsx'),

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
        format: (params: any) =>
          params.modules
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
