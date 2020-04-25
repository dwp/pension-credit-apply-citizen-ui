const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (plan, START_OF_NEXT_SECTION) => {
  // returned-to-uk
  plan.addSequence(WP.HRT_CITIZEN_RETURNED_TO_UK, START_OF_NEXT_SECTION);
};
