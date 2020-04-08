const stripSpaces = require('./strip-spaces.js');

const formatNino = (nino) => {
  if (typeof nino !== 'string') {
    throw new TypeError(`Expected string got ${typeof nino}: ${nino}`);
  }

  const sanitised = stripSpaces(nino).toUpperCase();

  let formatted = sanitised[0];

  for (let i = 1; i < sanitised.length; i++) {
    formatted += (i % 2 === 0) ? ` ${sanitised[i]}` : sanitised[i];
  }

  return formatted;
};

module.exports = formatNino;
