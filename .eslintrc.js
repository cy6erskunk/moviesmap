module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: [
    '@jetbrains',
    '@jetbrains/eslint-config/browser',
    '@jetbrains/eslint-config/es6',
    '@jetbrains/eslint-config/node',
    '@jetbrains/eslint-config/react',
    'prettier',
  ],
  plugins: ['prettier', 'compat'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
      },
    ],
    'react/jsx-tag-spacing': 'off',
    'valid-jsdoc': 'off',
    'import/no-commonjs': 'off',
    'compat/compat': 'error',
  },
  settings: {
    polyfills: ['fetch', 'Promise', 'Object.assign'],
    react: {
      version: 'detect',
    },
  },
}
