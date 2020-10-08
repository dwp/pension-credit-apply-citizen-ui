const { rowFactory, radioOptionValue, safeNl2br } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');
const getSelfEmploymentVars = require('../../utils/get-self-employment-vars.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.income === undefined) {
    return undefined;
  }

  const { liveWithPartner } = claim.eligibility || {};
  const jointSingle = liveWithPartner ? 'Joint' : 'Single';
  const { selfEmployedSuffix, selfEmployedEarningsDate } = getSelfEmploymentVars(context);
  const row = rowFactory(cyaUrl);
  const rov = radioOptionValue(t, context);

  return {
    heading: t('check-your-answers:sectionHeading.earnings'),
    rows: [
      /* ----------------------------------------------------------- earnings */
      // Do you have any income from employment?
      row({
        changeHref: `${WP.EARNINGS}#f-hasEmploymentIncome`,
        changeHtml: t('earnings:field.hasEmploymentIncome.change'),
        key: t(`earnings:field.hasEmploymentIncome.legend${jointSingle}`),
        value: rov('earnings.hasEmploymentIncome', 'earnings:field.hasEmploymentIncome.options'),
      }),

      // Have you had any income from self-employment since
      // ${selfEmployedEarningsDate}?
      row({
        changeHref: `${WP.EARNINGS}#f-hasSelfEmploymentIncome`,
        changeHtml: t(`earnings:field.hasSelfEmploymentIncome.change${jointSingle}${selfEmployedSuffix}`),
        key: t(`earnings:field.hasSelfEmploymentIncome.legend${jointSingle}${selfEmployedSuffix}`, { selfEmployedEarningsDate }),
        value: rov('earnings.hasSelfEmploymentIncome', 'earnings:field.hasSelfEmploymentIncome.options', selfEmployedSuffix),
      }),

      /* ------------------------------------------------------- other-income */
      // Do you have any other money coming in?
      row({
        changeHref: `${WP.OTHER_INCOME}#f-hasOtherIncome`,
        changeHtml: t('other-income:field.hasOtherIncome.change'),
        key: t(`other-income:pageTitle${jointSingle}`),
        value: rov('other-income.hasOtherIncome', 'other-income:field.hasOtherIncome.options'),
      }),

      // Details of other money you have coming in
      claim.income.earnOtherMoney && row({
        changeHref: `${WP.OTHER_INCOME}#f-otherIncomeDetails`,
        changeHtml: t('other-income:field.otherIncomeDetails.change'),
        key: t('check-your-answers:otherIncomeDetails.label'),
        valueHtml: safeNl2br(claim.income.earnOtherMoneyDescription),
      }),
    ],
  };
};
