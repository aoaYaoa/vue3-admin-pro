module.exports = {
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
      vue: 'always'
    }]
  }
} 