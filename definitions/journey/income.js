const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan) => {
  plan.addSequence(WP.PRIVATE_PENSIONS, WP.BENEFITS);
};
