const sanitiseMoney = (string) => {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected string got ${typeof string}: ${string}`);
  }

  const onlyNumber = string.replace(/[£,]/g, '');

  if (onlyNumber.includes('.')) {
    return onlyNumber;
  }

  return `${onlyNumber}.00`;
};

module.exports = sanitiseMoney;
