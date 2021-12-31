module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  plugins: [
    'html'
  ],
  ignorePatterns: [
    '**/node_modules/**',
    '{tmp,temp}/**',
    '**/*.min.js',
    'vendor/**',
    'dist/**',
    'public/**'
  ],
  overrides: [
    {
      files: ['*.json'],
      rules: {
        quotes: [2, 'double']
      }
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
      }
    },
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }

  ],
  rules: {
    // Console and debugger settings depending whether we're on production or not
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
