const { waypoints: WP } = require('../../lib/constants.js');
const { isYes, isNo } = require('../../utils/journey-helpers.js');

module.exports = (plan, START_OF_NEXT_SECTION) => {
  // returned-to-uk
  plan.setRoute(WP.HRT_CITIZEN_RETURNED_TO_UK, WP.HRT_CITIZEN_UK_SPONSORSHIP, isNo('cameToUk'));
  plan.setRoute(WP.HRT_CITIZEN_RETURNED_TO_UK, WP.HRT_CITIZEN_NATIONALITY_DETAILS, isYes('cameToUk'));

  // nationality-details
  plan.addSequence(WP.HRT_CITIZEN_NATIONALITY_DETAILS, WP.HRT_CITIZEN_UK_SPONSORSHIP);

  // uk-sponsorship
  plan.setRoute(WP.HRT_CITIZEN_UK_SPONSORSHIP, START_OF_NEXT_SECTION);
};
