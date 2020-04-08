/* eslint-disable no-console */

module.exports = () => ({
  fatal: console.log.bind(console),
  error: console.log.bind(console),
  warn: console.log.bind(console),
  info: console.log.bind(console),
  debug: console.log.bind(console),
  trace: console.log.bind(console),
});
