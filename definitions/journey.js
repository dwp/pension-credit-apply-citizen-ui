/**
 * Defines a plan for all possible routes through the Pension Credit service.
 */
const { Plan } = require('@dwp/govuk-casa');
const { waypoints: WP, origins: O } = require('../lib/constants.js');
const eligibility = require('./journey/eligibility.js');
const dateOfClaim = require('./journey/date-of-claim.js');

module.exports = () => {
  const plan = new Plan();

  plan.addOrigin(O.APPLY, WP.START);

  // Add eligibility routes
  eligibility(plan);
  dateOfClaim(plan);

  return plan;
};
