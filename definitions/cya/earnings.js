const { rowFactory, radioOptionValue, safeNl2br } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');
const isoStringToDateObject = require('../../utils/iso-string-to-date-object.js');
const getSelfEmploymentVars = require('../../utils/get-self-employment-vars.js');
const formatDateObject = require('../../utils/format-date-object.js');

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
      /* --------------------------------------------------------- employment */
      // Do you have any income from employment?
      row({
        changeHref: `${WP.EMPLOYMENT}#f-hasEmploymentIncome`,
        changeHtml: t(`employment:field.hasEmploymentIncome.change${jointSingle}`),
        key: t(`employment:pageTitle${jointSingle}`),
        value: rov('employment.hasEmploymentIncome', 'employment:field.hasEmploymentIncome.options'),
      }),

      // Employer details
      claim.income.employedPaidWorkDescription && row({
        changeHref: `${WP.EMPLOYMENT}#f-employerDetails`,
        changeHtml: t('employment:field.employerDetails.change'),
        key: t('employment:field.employerDetails.label'),
        valueHtml: safeNl2br(claim.income.employedPaidWorkDescription),
      }),

      /* ---------------------------------------------------- self-employment */
      // Have you had any income from self-employment since
      // ${selfEmployedEarningsDate}?
      row({
        changeHref: `${WP.SELF_EMPLOYMENT}#f-hasSelfEmploymentIncome`,
        changeHtml: t(`self-employment:field.hasSelfEmploymentIncome.change${jointSingle}${selfEmployedSuffix}`),
        key: t(`self-employment:pageTitle${jointSingle}${selfEmployedSuffix}`, {
          selfEmployedEarningsDate: formatDateObject(
            isoStringToDateObject(selfEmployedEarningsDate),
            { locale: context.nav.language },
          ),
        }),
        value: rov('self-employment.hasSelfEmploymentIncome', 'self-employment:field.hasSelfEmploymentIncome.options', selfEmployedSuffix),
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
