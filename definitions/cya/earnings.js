const { rowFactory, radioOptionValue, safeNl2br } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');
const formatDateObject = require('../../utils/format-date-object.js');

module.exports = (t, context, claim, cyaUrl) => {
  // Skip whole section if it was not completed
  if (claim.income === undefined) {
    return undefined;
  }

  const { hasPartner } = claim.eligibility || {};
  const jointSingle = hasPartner ? 'Joint' : 'Single';
  const { dateOfClaim } = context.getDataForPage(WP.DATE_OF_CLAIM) || {};
  const formattedDateOfClaim = dateOfClaim && formatDateObject(dateOfClaim);

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

      // Details of your income from employment
      claim.income.employedPaidWork && row({
        changeHref: `${WP.EARNINGS}#f-employmentIncomeDetails`,
        changeHtml: t('earnings:field.employmentIncomeDetails.change'),
        key: t('check-your-answers:employmentIncomeDetails.label'),
        valueHtml: safeNl2br(claim.income.employedPaidWorkDescription),
      }),

      // Do you have any income from self-employment now or in the 3 months
      // before ${dateOfClaim}?
      row({
        changeHref: `${WP.EARNINGS}#f-hasSelfEmploymentIncome`,
        changeHtml: t('earnings:field.hasSelfEmploymentIncome.change'),
        key: t(`earnings:field.hasSelfEmploymentIncome.legend${jointSingle}`, { dateOfClaim: formattedDateOfClaim }),
        value: rov('earnings.hasSelfEmploymentIncome', 'earnings:field.hasSelfEmploymentIncome.options'),
      }),

      // Details of your income from self-employment
      claim.income.selfEmployedPaidWork && row({
        changeHref: `${WP.EARNINGS}#f-selfEmploymentIncomeDetails`,
        changeHtml: t('earnings:field.selfEmploymentIncomeDetails.change'),
        key: t('check-your-answers:selfEmploymentIncomeDetails.label'),
        valueHtml: safeNl2br(claim.income.selfEmployedPaidWorkDescription),
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
