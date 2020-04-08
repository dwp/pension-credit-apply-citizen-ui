const stripSpaces = require('./strip-spaces.js');

const isPostcode = /^([A-Za-z][A-Ha-hK-Yk-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] ?0[Aa]{2})$/;

const isValidPostcode = (fieldValue = '') => {
  const valueWithoutSpaces = stripSpaces(fieldValue);

  return new Promise((resolve, reject) => {
    if (isPostcode.test(valueWithoutSpaces)) {
      resolve();
    } else {
      reject(new Error('postcode:field.postcode.format'));
    }
  });
};

module.exports = isValidPostcode;
