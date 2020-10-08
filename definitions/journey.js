/**
 * Defines a plan for all possible routes through the Pension Credit service.
 */
const { Plan } = require('@dwp/govuk-casa');
const { waypoints: WP, origins: O } = require('../lib/constants.js');
const eligibility = require('./journey/eligibility.js');
const aboutCitizen = require('./journey/about-citizen.js');
const whereYouLive = require('./journey/where-you-live.js');
const income = require('./journey/income.js');
const money = require('./journey/money.js');
const hrtCitizen = require('./journey/hrt-citizen.js');
const hrtPartner = require('./journey/hrt-partner.js');
const contactDetails = require('./journey/contact-details.js');

module.exports = () => {
  const plan = new Plan({
    validateBeforeRouteCondition: true,
  });

  plan.addOrigin(O.APPLY, WP.START);

  eligibility(plan);
  aboutCitizen(plan);
  whereYouLive(plan);
  income(plan);
  money(plan);
  hrtCitizen(plan);
  hrtPartner(plan);
  contactDetails(plan);

  return plan;
};
