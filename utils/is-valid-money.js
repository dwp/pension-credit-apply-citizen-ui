const { ValidationError } = require('@dwp/govuk-casa');

const isMoney = /^[0-9]{1,10}\.[0-9]{2}$/;

const validator = ({ errorMsg }) => function isValidMoney(value = '', dataContext) {
  return new Promise((resolve, reject) => {
    if (isMoney.test(value)) {
      resolve();
    } else {
      reject(ValidationError.make({ errorMsg, dataContext }));
    }
  });
};

module.exports = validator;
