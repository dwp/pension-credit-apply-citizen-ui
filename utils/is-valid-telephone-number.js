const { ValidationError } = require('@dwp/govuk-casa');

const isTelephoneNumber = /^[0-9() -]{1,20}$/;

const validator = ({ errorMsg }) => function isValidTelephoneNumber(value, dataContext) {
  return new Promise((resolve, reject) => {
    if (!value || isTelephoneNumber.test(value)) {
      resolve();
    } else {
      reject(ValidationError.make({ errorMsg, dataContext }));
    }
  });
};

module.exports = validator;
