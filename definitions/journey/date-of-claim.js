const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan) => {
  plan.addSequence(WP.DATE_OF_CLAIM, WP.CLAIMANT_DETAILS);
};
