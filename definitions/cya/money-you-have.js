const { row, radioOptionValue, safeNl2br } = require('./utils.js');
const { waypoints: WP } = require('../../lib/constants.js');
const formatDateObject = require('../../utils/format-date-object.js');
const needToBackdate = require('../../utils/need-to-backdate.js');
const formatMoney = require('../../utils/format-money.js');

module.exports = (t, context, claim) => {
  // Skip whole section if it was not completed
  if (claim.moneySavingsInvestments === undefined) {
    return undefined;
  }

  const { dateOfClaim } = context.getDataForPage(WP.DATE_OF_CLAIM) || {};
  const formattedDateOfClaim = dateOfClaim && formatDateObject(dateOfClaim);

  const rov = radioOptionValue(t, context);
  const isCheckedYesNo = (claimData, name) => (
    claimData
      ? t(`disregarded-money:field.disregardedMoney.options.${name}.cyaYes`)
      : t(`disregarded-money:field.disregardedMoney.options.${name}.cyaNo`)
  );

  return {
    heading: t('check-your-answers:sectionHeading.money-you-have'),
    rows: [
      /* ----------------------------------------------------- money-you-have */
      // How much money you had on ${dateOfClaim}
      !needToBackdate(context) ? undefined : row({
        changeHref: `${WP.MONEY_YOU_HAVE}#f-moneyBackdated`,
        changeHtml: t('money-you-have:field.moneyBackdated.change'),
        key: t('money-you-have:field.moneyBackdated.label', { dateOfClaim: formattedDateOfClaim }),
        value: formatMoney(claim.moneySavingsInvestments.moneyBackdatedAmount),
      }),

      // How much money you have today
      row({
        changeHref: `${WP.MONEY_YOU_HAVE}#f-moneyToday`,
        changeHtml: t('money-you-have:field.moneyToday.change'),
        key: t('money-you-have:field.moneyToday.label'),
        value: formatMoney(claim.moneySavingsInvestments.moneyAmount),
      }),

      /* ---------------------------------------------------- second-property */
      // How much money you have today
      row({
        changeHref: `${WP.SECOND_PROPERTY}#f-hasSecondProperty`,
        changeHtml: t('second-property:field.hasSecondProperty.change'),
        key: t('second-property:pageTitle'),
        value: rov('second-property.hasSecondProperty', 'second-property:field.hasSecondProperty.options'),
      }),

      /* -------------------------------------------------- disregarded-money */
      // Payments to correct or compensate for an official error or for arrears
      // of benefits
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-1`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.officialError.change'),
        key: t('disregarded-money:field.disregardedMoney.options.officialError.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.benefitArrears, 'officialError'),
      }),

      // Details of benefit arrears, correction or compensation payments
      claim.moneySavingsInvestments.benefitArrears && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-officialErrorDetails`,
        changeHtml: t('disregarded-money:field.officialErrorDetails.change'),
        key: t('check-your-answers:officialErrorDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.benefitArrearsDetails),
      }),

      // Payments related to Council Tax Reduction
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-2`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.councilTaxReduction.change'),
        key: t('disregarded-money:field.disregardedMoney.options.councilTaxReduction.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.councilTaxArrears, 'councilTaxReduction'),
      }),

      // Details of payments related to Council Tax Reduction
      claim.moneySavingsInvestments.councilTaxArrears && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-councilTaxReductionDetails`,
        changeHtml: t('disregarded-money:field.councilTaxReductionDetails.change'),
        key: t('check-your-answers:councilTaxReductionDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.councilTaxArrearsDetails),
      }),

      // Compensation payments related to the second world war or service in the
      // armed forces
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-3`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.armedForces.change'),
        key: t('disregarded-money:field.disregardedMoney.options.armedForces.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.councilTaxArrears, 'armedForces'),
      }),

      // Details of compensation payments related to the second world war or
      // service in the armed forces
      claim.moneySavingsInvestments.secondWorldWar && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-armedForcesDetails`,
        changeHtml: t('disregarded-money:field.armedForcesDetails.change'),
        key: t('check-your-answers:armedForcesDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.secondWorldWarDetails),
      }),

      // Personal injury claim payments
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-4`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.personalInjury.change'),
        key: t('disregarded-money:field.disregardedMoney.options.personalInjury.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.personalInjury, 'personalInjury'),
      }),

      // Details of personal injury claim payments
      claim.moneySavingsInvestments.personalInjury && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-personalInjuryDetails`,
        changeHtml: t('disregarded-money:field.personalInjuryDetails.change'),
        key: t('check-your-answers:personalInjuryDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.personalInjuryDetails),
      }),

      // Payments from a home insurance policy to cover lost or damaged personal
      // possessions
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-5`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.homeInsurance.change'),
        key: t('disregarded-money:field.disregardedMoney.options.homeInsurance.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.homeInsurance, 'homeInsurance'),
      }),

      // Details of payments from a home insurance policy to cover lost or
      // damaged personal possessions
      claim.moneySavingsInvestments.homeInsurance && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-homeInsuranceDetails`,
        changeHtml: t('disregarded-money:field.homeInsuranceDetails.change'),
        key: t('check-your-answers:homeInsuranceDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.homeInsuranceDetails),
      }),

      // Savings that you intend to use to buy or make essential repairs to your
      // main home
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-6`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.homeRepairs.change'),
        key: t('disregarded-money:field.disregardedMoney.options.homeRepairs.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.essentialRepairs, 'homeRepairs'),
      }),

      // Details of savings that you intend to use to buy or make essential
      // repairs to your main home
      claim.moneySavingsInvestments.essentialRepairs && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-homeRepairsDetails`,
        changeHtml: t('disregarded-money:field.homeRepairsDetails.change'),
        key: t('check-your-answers:homeRepairsDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.essentialRepairsDetails),
      }),

      // Payments to help you live independently in your own home or the
      // community
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-7`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.liveIndependent.change'),
        key: t('disregarded-money:field.disregardedMoney.options.liveIndependent.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.independentLiving, 'liveIndependent'),
      }),

      // Details of payments to help you live independently in your own home or
      // the community
      claim.moneySavingsInvestments.independentLiving && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-liveIndependentDetails`,
        changeHtml: t('disregarded-money:field.liveIndependentDetails.change'),
        key: t('check-your-answers:liveIndependentDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.independentLivingDetails),
      }),

      // Payments to help you if you have been involved in an incident or
      // emergency
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-8`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.incident.change'),
        key: t('disregarded-money:field.disregardedMoney.options.incident.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.incidentEmergency, 'incident'),
      }),

      // Details of payments to help you if you have been involved in an
      // incident or emergency
      claim.moneySavingsInvestments.incidentEmergency && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-incidentDetails`,
        changeHtml: t('disregarded-money:field.incidentDetails.change'),
        key: t('check-your-answers:incidentDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.incidentEmergencyDetails),
      }),

      // Windrush child compensation
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-9`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.windrush.change'),
        key: t('disregarded-money:field.disregardedMoney.options.windrush.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.windrush, 'windrush'),
      }),

      // Details of Windrush child compensation
      claim.moneySavingsInvestments.windrush && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-windrushDetails`,
        changeHtml: t('disregarded-money:field.windrushDetails.change'),
        key: t('check-your-answers:windrushDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.windrushDetails),
      }),

      // Payments to support you with the effects of a blood infection or vCJD
      row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-disregardedMoney-9`,
        changeHtml: t('disregarded-money:field.disregardedMoney.options.blood.change'),
        key: t('disregarded-money:field.disregardedMoney.options.blood.label'),
        value: isCheckedYesNo(claim.moneySavingsInvestments.bloodInfection, 'blood'),
      }),

      // Details of payments to support you with the effects of a blood
      // infection or vCJD
      claim.moneySavingsInvestments.bloodInfection && row({
        changeHref: `${WP.DISREGARDED_MONEY}#f-bloodDetails`,
        changeHtml: t('disregarded-money:field.bloodDetails.change'),
        key: t('check-your-answers:bloodDetails.label'),
        valueHtml: safeNl2br(claim.moneySavingsInvestments.bloodInfectionDetails),
      }),
    ],
  };
};
