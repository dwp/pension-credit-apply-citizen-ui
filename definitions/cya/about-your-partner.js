const { row, radioOptionValue } = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim) => {
  // Skip whole section if claimant does not have a partner
  if (!claim.hasPartner()) {
    return undefined;
  }

  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.about-your-partner'),
    rows: [
      /* ------------------------------------------------------ partner-agree */
      // Does your partner agree to you making this application?
      row({
        changeHref: `${WP.PARTNER_AGREE}#f-partnerAgree`,
        changeHtml: t('partner-agree:field.partnerAgree.change'),
        key: t('partner-agree:pageTitle'),
        value: rov('partner-agree.partnerAgree', 'partner-agree:field.partnerAgree.options'),
      }),

      // Your partner's date of birth
      row({
        changeHref: `${WP.LIVE_WITH_PARTNER}#f-partnerDateOfBirth`,
        changeHtml: t('live-with-partner:field.partnerDateOfBirth.change'),
        key: t('live-with-partner:field.partnerDateOfBirth.legend'),
        value: formatDateObject(context.data['live-with-partner'].partnerDateOfBirth),
      }),

      /* -------------------------------------------- partner-housing-benefit */
      // Does your partner get pension age Housing Benefit?
      !claim.eligibility.partnerPensionAgeHousingBenefit ? undefined : row({
        changeHref: `${WP.PARTNER_HOUSING_BENEFIT}#f-partnerGetsHousingBenefit`,
        changeHtml: t('partner-housing-benefit:field.partnerGetsHousingBenefit.change'),
        key: t('partner-housing-benefit:pageTitle'),
        value: rov('partner-housing-benefit.partnerGetsHousingBenefit', 'partner-housing-benefit:field.partnerGetsHousingBenefit.options'),
      }),
    ],
  };
};
