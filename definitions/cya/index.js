/**
 * Each of the sections generated here must produce either `undefined`, if that
 * section should not be visible, or an object matching the below:
 * {
 *   heading: "Section heading",
 *   rows: [ array of rows suitable for use in the govukSummaryList macro ]
 * }
 *
 * All strings must be translated, using the passed `t()` function.
 */

const aboutYou = require('./about-you.js');
const aboutYourPartner = require('./about-your-partner.js');
const aboutWhereYouLive = require('./about-where-you-live.js');
const benefits = require('./benefits.js');
const earnings = require('./earnings.js');
const moneyYouHave = require('./money-you-have.js');
const aboutYourResidency = require('./about-your-residency.js');
const aboutYourPartnersResidency = require('./about-your-partners-residency.js');
const helpFromOthers = require('./help-from-others.js');

module.exports = (t, context, claim, cyaUrl) => ([
  aboutYou(t, context, claim, cyaUrl),
  aboutYourPartner(t, context, claim, cyaUrl),
  aboutWhereYouLive(t, context, claim, cyaUrl),
  benefits(t, context, claim, cyaUrl),
  earnings(t, context, claim, cyaUrl),
  moneyYouHave(t, context, claim, cyaUrl),
  aboutYourResidency(t, context, claim, cyaUrl),
  aboutYourPartnersResidency(t, context, claim, cyaUrl),
  helpFromOthers(t, context, cyaUrl),
].filter((v) => v));
