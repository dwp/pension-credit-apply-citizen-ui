const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan) => {
  plan.addSequence(
    WP.MONEY_YOU_HAVE,
    WP.SECOND_PROPERTY,
  );
};
