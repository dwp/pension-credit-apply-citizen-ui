const { rowFactory, radioOptionValue, safeNl2br } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.pensions === undefined) {
    return undefined;
  }

  const { hasPartner } = claim.eligibility || {};
  const jointSingle = hasPartner ? 'Joint' : 'Single';

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.pensions'),
    rows: [
      /* --------------------------------------------------- private-pensions */
      // Do you get a private pension, a pension from a place where you used
      // to work or any other pension?
      row({
        changeHref: `${WP.PRIVATE_PENSIONS}#f-hasPrivatePensions`,
        changeHtml: t('private-pensions:field.hasPrivatePensions.change'),
        key: t(`private-pensions:pageTitle${jointSingle}`),
        value: rov('private-pensions.hasPrivatePensions', 'private-pensions:field.hasPrivatePensions.options'),
      }),

      // Details of your private and workplace pensions
      claim.pensions.privatePension && row({
        changeHref: `${WP.PRIVATE_PENSIONS}#f-privatePensionDetails`,
        changeHtml: t('private-pensions:field.privatePensionDetails.change'),
        key: t('check-your-answers:privatePensionDetails.label'),
        valueHtml: safeNl2br(claim.pensions.privatePensionDescription),
      }),
    ],
  };
};
