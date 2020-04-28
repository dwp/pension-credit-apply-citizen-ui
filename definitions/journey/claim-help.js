const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan) => {
  plan.addSequence(WP.CLAIM_HELP, WP.CHECK_YOUR_ANSWERS);
};
