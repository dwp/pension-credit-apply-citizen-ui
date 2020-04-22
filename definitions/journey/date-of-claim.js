const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan, START_OF_NEXT_SECTION = WP.CLAIMANT_DETAILS) => {
  plan.addSequence(WP.DATE_OF_CLAIM, START_OF_NEXT_SECTION);
};
