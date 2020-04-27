/**
 * Defines a plan for all possible routes through the Pension Credit service.
 */
const { Plan } = require('@dwp/govuk-casa');
const { waypoints: WP, origins: O } = require('../lib/constants.js');
const eligibility = require('./journey/eligibility.js');
const dateOfClaim = require('./journey/date-of-claim.js');
const aboutCitizen = require('./journey/about-citizen.js');
const hrtCitizen = require('./journey/hrt-citizen.js');

module.exports = () => {
  const plan = new Plan();

  plan.addOrigin(O.APPLY, WP.START);

  eligibility(plan);
  dateOfClaim(plan);
  aboutCitizen(plan);
  hrtCitizen(plan, WP.CARE_HOME, WP.CHECK_YOUR_ANSWERS);

  return plan;
};
