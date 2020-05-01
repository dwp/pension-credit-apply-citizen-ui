const { rowFactory, radioOptionValue } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, cyaUrl) => {
  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);

  /* --------------------------------------------------------- claim-help */
  return {
    heading: t('check-your-answers:sectionHeading.claim-help'),
    rows: [
      row({
        changeHref: `${WP.CLAIM_HELP}#f-helpMakingClaim`,
        changeHtml: t('claim-help:field.helpMakingClaim.change'),
        key: t('claim-help:pageTitle'),
        value: rov('claim-help.helpMakingClaim', 'claim-help:field.helpMakingClaim.options'),
      }),
    ],
  };
};
