const { waypoints: WP } = require('../../lib/constants.js');
const sanitiseMoney = require('../../utils/sanitise-money.js');

const disgregardsLimit = 10000;

const over10k = (r, c) => {
  // set default to a string value to ensure all values (1000 || 1000.00 || 1,000.00)
  // are processed in a consistent way
  const { moneyBackdated = '0', moneyToday = '0' } = c.getDataForPage(WP.MONEY_YOU_HAVE)
    || Object.create(null);
  const { hasSecondProperty } = c.getDataForPage(WP.SECOND_PROPERTY)
    || Object.create(null);

  // sanitise the money values incase they have a ',' value in the (e.g. 10,000)
  // as the parseFloat function removes the trailing figures (e.g parseFloat(10,000) = 10)
  const sanitisedMoneyBackdated = parseFloat(sanitiseMoney(moneyBackdated));
  const sanitisedMoneyToday = parseFloat(sanitiseMoney(moneyToday));

  if (sanitisedMoneyBackdated > disgregardsLimit
    || sanitisedMoneyToday > disgregardsLimit
    || (sanitisedMoneyBackdated > 0 && hasSecondProperty === 'yes')
    || (sanitisedMoneyToday > 0 && hasSecondProperty === 'yes')
  ) {
    return true;
  }

  return false;
};

module.exports = over10k;
