module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier', 'compat'],
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
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
