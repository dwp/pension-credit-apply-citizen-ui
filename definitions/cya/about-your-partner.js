/* eslint-disable sonarjs/no-duplicate-string */
const { rowFactory, radioOptionValue } = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if claimant does not live with a partner
  if (!claim.liveWithPartner()) {
    return undefined;
  }

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);

  // Common options for `formatDateObject()` calls
  const dateOpts = { locale: context.nav.language };

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
        changeHref: `${WP.LIVE_WITH_PARTNER}#f-partnerDateOfBirth[dd]`,
        changeHtml: t('live-with-partner:field.partnerDateOfBirth.change'),
        key: t('live-with-partner:field.partnerDateOfBirth.legend'),
        value: formatDateObject(context.data['live-with-partner'].partnerDateOfBirth, dateOpts),
      }),

      /* -------------------------------------------- partner-housing-benefit */
      // Does your partner get pension age Housing Benefit?
      !claim.eligibility.partnerPensionAgeHousingBenefit ? undefined : row({
        changeHref: `${WP.PARTNER_HOUSING_BENEFIT}#f-partnerGetsHousingBenefit`,
        changeHtml: t('partner-housing-benefit:field.partnerGetsHousingBenefit.change'),
        key: t('partner-housing-benefit:pageTitle'),
        value: rov('partner-housing-benefit.partnerGetsHousingBenefit', 'partner-housing-benefit:field.partnerGetsHousingBenefit.options'),
      }),

      /* ---------------------------------------------------- partner-details */
      // What is your partner’s National Insurance number?
      row({
        changeHref: `${WP.PARTNER_NI_NUMBER}#f-partnerNino`,
        changeHtml: t('partner-national-insurance:field.partnerNino.change'),
        key: t('partner-national-insurance:field.partnerNino.label'),
        value: context.data['partner-national-insurance'].partnerNino,
      }),

      // What is your partner’s full name?
      row({
        changeHref: `${WP.PARTNER_NAME}#f-partnerFullName`,
        changeHtml: t('partner-name:field.partnerFullName.change'),
        key: t('partner-name:pageTitle'),
        value: context.data['partner-name'].partnerFullName,
      }),

      // Is your partner registered blind or severely sight impaired?
      row({
        changeHref: `${WP.PARTNER_BLIND}#f-partnerRegisteredBlind`,
        changeHtml: t('partner-registered-blind:field.partnerRegisteredBlind.change'),
        key: t('partner-registered-blind:field.partnerRegisteredBlind.legend'),
        value: rov('partner-registered-blind.partnerRegisteredBlind', 'partner-registered-blind:field.partnerRegisteredBlind.options'),
      }),
    ],
  };
};
