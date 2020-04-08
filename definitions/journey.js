/**
 * Defines a plan for all possible routes through the Pension Credit service.
 */
const { Plan } = require('@dwp/govuk-casa');
const { waypoints: WP, origins: O } = require('../lib/constants.js');

module.exports = () => {
  const plan = new Plan();

  plan.addOrigin(O.APPLY, WP.START);

  return plan;
};
