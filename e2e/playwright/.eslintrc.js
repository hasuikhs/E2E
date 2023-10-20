module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: [ '.eslintrc.{js,cjs}' ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [ '@typescript-eslint' ],
  rules: {
    "semi": [ 2, "always" ],
    "no-unused-vars": "warn",
    "quotes": "off",
    "jsx-quotes": "off",
    "object-curly-spacing": [ "warn", "always" ],
    "comma-dangle": "off",
    "array-bracket-spacing": [ "warn", "always" ],
    "no-console": [ "warn", { "allow": [ "error", "warn", "info" ] } ],
    "space-before-blocks": "error",
    "space-before-function-paren": "off",
    "indent": "off"
  },
};
