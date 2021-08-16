module.exports = {
  env: {
    browser: false,
    es2020: true,
    node: true
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'comma-dangle': 'off'
  }
};
