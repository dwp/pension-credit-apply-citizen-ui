module.exports = {
  "root": true,
  "extends": ["@dwp/eslint-config-base", "plugin:sonarjs/recommended"],
  "plugins": [
    "sonarjs"
  ],
  "rules": {
    "sonarjs/cognitive-complexity": [1, 10]
  },
  "parserOptions": {
    "ecmaVersion": "2018"
  }
};
