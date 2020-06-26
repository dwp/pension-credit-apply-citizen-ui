const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan) => {
  plan.addSequence(
    WP.BENEFITS,
    WP.EARNINGS,
    WP.OTHER_INCOME,
    WP.MONEY_YOU_HAVE,
  );
};
