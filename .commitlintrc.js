module.exports = {
  "extends": ["@dwp/commitlint-config-base"],
  "rules": {
    "references-empty": [ 1, "never" ]
  },
  "parserPreset": {
    "parserOpts": {
      "issuePrefixes": [ "MYPC-" ]
    }
  }
};
