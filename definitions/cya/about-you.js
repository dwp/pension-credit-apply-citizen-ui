const { row, radioOptionValue } = require('./utils.js');
const formatDateObject = require('../../utils/format-date-object.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim) => {
  // Skip whole section if it was not completed
  if (claim.eligibility === undefined) {
    return undefined;
  }

  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.about-you'),
    rows: [
      /* ---------------------------------------------- claimed-state-pension */
      // Have you claimed your State Pension?
      row({
        changeHref: `${WP.CLAIMED_STATE_PENSION}#f-statePensionClaimed`,
        changeHtml: t('claimed-state-pension:field.statePensionClaimed.change'),
        key: t('claimed-state-pension:pageTitle'),
        value: rov('claimed-state-pension.statePensionClaimed', 'claimed-state-pension:field.statePensionClaimed.options'),
      }),

      /* ------------------------------------------- children-living-with-you */
      // Do any children or qualifying young people live with you?
      row({
        changeHref: `${WP.CHILDREN_LIVING_WITH_YOU}#f-hasChildren`,
        changeHtml: t('children-living-with-you:field.hasChildren.change'),
        key: t('children-living-with-you:pageTitle'),
        value: rov('children-living-with-you.hasChildren', 'children-living-with-you:field.hasChildren.options'),
      }),

      /* ---------------------------------------- live-england-scotland-wales */
      // Do you live in England, Scotland or Wales?
      row({
        changeHref: `${WP.LIVE_ENGLAND_SCOTLAND_WALES}#f-inEnglandScotlandWales`,
        changeHtml: t('live-england-scotland-wales:field.inEnglandScotlandWales.change'),
        key: t('live-england-scotland-wales:pageTitle'),
        value: rov('live-england-scotland-wales.inEnglandScotlandWales', 'live-england-scotland-wales:field.inEnglandScotlandWales.options'),
      }),

      /* --------------------------------------------------- your-nationality */
      // Have you lived permanently in the UK for the last 2 years?
      row({
        changeHref: `${WP.YOUR_NATIONALITY}#f-lived2Years`,
        changeHtml: t('your-nationality:field.lived2Years.change'),
        key: t('your-nationality:field.lived2Years.legend'),
        value: rov('your-nationality.lived2Years', 'your-nationality:field.lived2Years.options'),
      }),

      // Do you have the right to live or work in the UK without any immigration restrictions?
      row({
        changeHref: `${WP.YOUR_NATIONALITY}#f-rightToReside`,
        changeHtml: t('your-nationality:field.rightToReside.change'),
        key: t('your-nationality:field.rightToReside.legend'),
        value: rov('your-nationality.rightToReside', 'your-nationality:field.rightToReside.options'),
      }),

      /* ------------------------------------------------------ date-of-claim */
      // What date do you want your Pension Credit claim to start?
      row({
        changeHref: `${WP.DATE_OF_CLAIM}#f-dateOfClaim`,
        changeHtml: t('date-of-claim:field.dateOfClaim.change'),
        key: t('date-of-claim:pageTitle'),
        value: formatDateObject(context.data['date-of-claim'].dateOfClaim),
      }),

      /* ------------------------------------------------------ date-of-birth */
      // What is your date of birth?
      row({
        changeHref: `${WP.DATE_OF_BIRTH}#f-dateOfBirth`,
        changeHtml: t('date-of-birth:field.dateOfBirth.change'),
        key: t('date-of-birth:pageTitle'),
        value: formatDateObject(context.data['date-of-birth'].dateOfBirth),
      }),

      /* -------------------------------------------------- live-with-partner */
      // Do you live with a partner?
      row({
        changeHref: `${WP.LIVE_WITH_PARTNER}#f-liveWithPartner`,
        changeHtml: t('live-with-partner:field.liveWithPartner.change'),
        key: t('live-with-partner:pageTitle'),
        value: rov('live-with-partner.liveWithPartner', 'live-with-partner:field.liveWithPartner.options'),
      }),
    ],
  };
};
