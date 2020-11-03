const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan) => {
  plan.addSequence(
    WP.UNIVERSAL_CREDIT,
    WP.BENEFITS,
    WP.EMPLOYMENT,
    WP.SELF_EMPLOYMENT,
    WP.OTHER_INCOME,
    WP.MONEY_YOU_HAVE,
  );
};
