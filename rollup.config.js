/* eslint-disable import/no-extraneous-dependencies */
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const legacy = require('@rollup/plugin-legacy');

module.exports = {
  input: 'assets/all.js',
  output: [{
    file: 'dist/js/apply-citizen-ui.js',
    name: 'PCFrontend',
    format: 'umd',
  }],
  plugins: [
    nodeResolve(),
    legacy({}),
    terser({ ie8: true }),
  ],
};
