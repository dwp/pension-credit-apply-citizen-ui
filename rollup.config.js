/* eslint-disable import/no-extraneous-dependencies */
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const legacy = require('@rollup/plugin-legacy');
const fs = require('fs');

module.exports = {
  input: 'assets/all.js',
  output: [{
    file: 'dist/js/apply-citizen-ui.js',
    name: 'GOVUKFrontend',
    format: 'umd',
    // The GOVUKFrontend bundle is inited in this file, which also contains
    // non-bundleable custom CASA js.
    outro: fs.readFileSync(require.resolve('@dwp/govuk-casa/src/js/casa.js')),
  }],
  plugins: [
    nodeResolve(),
    legacy({}),
    terser({ ie8: true }),
  ],
};
