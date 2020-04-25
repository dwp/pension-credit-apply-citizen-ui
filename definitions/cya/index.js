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
const aboutYourResidency = require('./about-your-residency.js');

module.exports = (t, context, traversedWaypoints) => ([
  aboutYou(t, context, traversedWaypoints),
  aboutYourPartner(t, context, traversedWaypoints),
  aboutYourResidency(t, context, traversedWaypoints),
].filter((v) => v));
