const isTelephoneNumber = /^[0-9() -]{1,20}$/;

const validator = (config = {}) => function isValidTelephoneNumber(fieldValue) {
  return new Promise((resolve, reject) => {
    if (isTelephoneNumber.test(fieldValue)) {
      resolve();
    } else {
      reject(new Error(config.errorMsg));
    }
  });
};

module.exports = validator;
