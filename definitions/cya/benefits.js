const { rowFactory, radioOptionValue, safeNl2br } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.benefits === undefined) {
    return undefined;
  }

  const { hasPartner } = claim.eligibility || {};
  const jointSingle = hasPartner ? 'Joint' : 'Single';

  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.benefits'),
    rows: [
      /* ----------------------------------------------------------- benefits */
      // Have you applied for any benefits that you are waiting to hear about?
      row({
        changeHref: `${WP.BENEFITS}#f-waitingToHearAboutBenefits`,
        changeHtml: t('benefits:field.waitingToHearAboutBenefits.change'),
        key: t(`benefits:field.waitingToHearAboutBenefits.legend${jointSingle}`),
        value: rov('benefits.waitingToHearAboutBenefits', 'benefits:field.waitingToHearAboutBenefits.options'),
      }),

      // Which benefits have you applied for?
      claim.benefits.pendingBenefits && row({
        changeHref: `${WP.BENEFITS}#f-benefitsDetails`,
        changeHtml: t('benefits:field.benefitsDetails.change'),
        key: t('benefits:field.benefitsDetails.label'),
        valueHtml: safeNl2br(claim.benefits.pendingBenefitsDescription),
      }),

      // Does anyone get Carer’s Allowance or the Carer’s Element of Universal
      // Credit for looking after you?
      row({
        changeHref: `${WP.BENEFITS}#f-anyoneGetCarers`,
        changeHtml: t('benefits:field.anyoneGetCarers.change'),
        key: t(`benefits:field.anyoneGetCarers.legend${jointSingle}`),
        value: rov('benefits.anyoneGetCarers', 'benefits:field.anyoneGetCarers.options'),
      }),
    ],
  };
};
