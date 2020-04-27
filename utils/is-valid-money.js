const isMoney = /^[0-9]+\.[0-9]{2}$/;

const validator = ({ errorMsg }) => function isValidMoney(value = '') {
  return new Promise((resolve, reject) => {
    if (isMoney.test(value)) {
      resolve();
    } else {
      reject(new Error(errorMsg));
    }
  });
};

module.exports = validator;
