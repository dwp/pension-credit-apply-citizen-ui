const { row, radioOptionValue } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, traversedWaypoints) => {
  // Skip whole section if claimant does not have a partner
  if (!traversedWaypoints.includes(WP.HRT_CITIZEN_RETURNED_TO_UK)) {
    return undefined;
  }

  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.hrt-citizen'),
    rows: [
      /* ----------------------------------------------------- returned-to-uk */
      // At any time, have you come to live in the UK or returned to the UK to live from abroad?
      row({
        changeHref: `${WP.HRT_CITIZEN_RETURNED_TO_UK}#f-cameToUk`,
        changeHtml: t('returned-to-uk:field.cameToUk.change'),
        key: t('returned-to-uk:pageTitle'),
        value: rov('returned-to-uk.cameToUk', 'returned-to-uk:field.cameToUk.options'),
      }),
    ],
  };
};
