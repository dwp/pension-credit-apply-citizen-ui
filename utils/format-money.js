const sanitiseMoney = require('./sanitise-money.js');

// Internationalisation formatter to covert a Number to GB local currency string
// 1000.50 -> £1,000.50
// 100 -> £100.00
const GBP = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 2,
});

module.exports = (string) => GBP.format(sanitiseMoney(string));
