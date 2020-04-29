const { waypoints: WP } = require('../../lib/constants');

const disgregardsLimit = 10000;

const over10k = (r, c) => {
  const { moneyBackdated = 0, moneyToday = 0 } = c.getDataForPage(WP.MONEY_YOU_HAVE)
    || Object.create(null);
  const { hasSecondProperty } = c.getDataForPage(WP.SECOND_PROPERTY)
    || Object.create(null);

  if (parseFloat(moneyBackdated) > disgregardsLimit
    || parseFloat(moneyToday) > disgregardsLimit
    || hasSecondProperty === 'yes'
  ) {
    return true;
  }

  return false;
};

module.exports = over10k;
