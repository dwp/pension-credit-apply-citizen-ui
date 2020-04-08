const stripSpaces = require('./strip-spaces.js');

const sanitiseNino = (input) => {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected string got ${typeof input}: ${input}`);
  }

  return stripSpaces(input).toUpperCase();
};

module.exports = sanitiseNino;
