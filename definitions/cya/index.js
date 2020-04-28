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
const aboutYourResidency = require('./about-your-residency.js');
const aboutYourPartnersResidency = require('./about-your-partners-residency.js');

module.exports = (t, context, claim) => ([
  aboutYou(t, context, claim),
  aboutYourPartner(t, context, claim),
  aboutWhereYouLive(t, context, claim),
  aboutYourResidency(t, context, claim),
  aboutYourPartnersResidency(t, context, claim),
].filter((v) => v));
