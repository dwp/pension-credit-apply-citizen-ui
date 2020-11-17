const { rowFactory, radioOptionValue, safeNl2br } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.benefits === undefined) {
    return undefined;
  }

  const { liveWithPartner } = claim.eligibility || {};
  const jointSingle = liveWithPartner ? 'Joint' : 'Single';

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.benefits'),
    rows: [
      /* --------------------------------------------------- universal-credit */
      // Do you currently claim Universal Credit?
      row({
        changeHref: `${WP.UNIVERSAL_CREDIT}#f-claimsUniversalCredit`,
        changeHtml: t(`universal-credit:field.claimsUniversalCredit.change${jointSingle}`),
        key: t(`universal-credit:pageTitle${jointSingle}`),
        value: rov('universal-credit.claimsUniversalCredit', 'universal-credit:field.claimsUniversalCredit.options'),
      }),

      /* ------------------------------------------------------------- carers */
      // Does anyone get Carer’s Allowance or the Carer’s Element of Universal
      // Credit for looking after you?
      row({
        changeHref: `${WP.CARERS}#f-anyoneGetCarers`,
        changeHtml: t('carers:field.anyoneGetCarers.change'),
        key: t(`carers:pageTitle${jointSingle}`),
        value: rov('carers.anyoneGetCarers', 'carers:field.anyoneGetCarers.options'),
      }),

      /* ----------------------------------------------------------- benefits */
      // Have you applied for any benefits that you are waiting to hear about?
      row({
        changeHref: `${WP.BENEFITS}#f-waitingToHearAboutBenefits`,
        changeHtml: t('benefits:field.waitingToHearAboutBenefits.change'),
        key: t(`benefits:pageTitle${jointSingle}`),
        value: rov('benefits.waitingToHearAboutBenefits', 'benefits:field.waitingToHearAboutBenefits.options'),
      }),

      // Which benefits have you applied for?
      claim.benefits.pendingBenefits && row({
        changeHref: `${WP.BENEFITS}#f-benefitsDetails`,
        changeHtml: t('benefits:field.benefitsDetails.change'),
        key: t('benefits:field.benefitsDetails.label'),
        valueHtml: safeNl2br(claim.benefits.pendingBenefitsDescription),
      }),
    ],
  };
};
