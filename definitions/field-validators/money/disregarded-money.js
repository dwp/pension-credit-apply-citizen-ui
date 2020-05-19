const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');
const northernIrelandErrorMsg = require('../../../utils/northern-ireland-error-message.js');

// Validation is conditional on whether the associated checkbox was checked
const ifPaymentsInclude = (payment) => ({ journeyContext: c, waypointId }) => {
  const { disregardedMoney } = c.getDataForPage(waypointId) || Object.create(null);
  const disregards = Array.isArray(disregardedMoney) ? disregardedMoney : [disregardedMoney];
  return disregards.includes(payment);
};

const fieldValidators = Object.assign(Object.create(null), {
  disregardedMoney: sf([
    r.optional,
  ]),
  officialErrorDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.officialErrorDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.officialErrorDetails.length',
    }),
  ], ifPaymentsInclude('officialError')),
  councilTaxReductionDetails: sf([
    r.required.bind({
      errorMsg: northernIrelandErrorMsg('disregarded-money:field.councilTaxReductionDetails.required'),
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: northernIrelandErrorMsg('disregarded-money:field.councilTaxReductionDetails.length'),
    }),
  ], ifPaymentsInclude('councilTaxReduction')),
  armedForcesDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.armedForcesDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.armedForcesDetails.length',
    }),
  ], ifPaymentsInclude('armedForces')),
  personalInjuryDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.personalInjuryDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.personalInjuryDetails.length',
    }),
  ], ifPaymentsInclude('personalInjury')),
  homeInsuranceDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.homeInsuranceDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.homeInsuranceDetails.length',
    }),
  ], ifPaymentsInclude('homeInsurance')),
  homeRepairsDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.homeRepairsDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.homeRepairsDetails.length',
    }),
  ], ifPaymentsInclude('homeRepairs')),
  liveIndependentDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.liveIndependentDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.liveIndependentDetails.length',
    }),
  ], ifPaymentsInclude('liveIndependent')),
  incidentDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.incidentDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.incidentDetails.length',
    }),
  ], ifPaymentsInclude('incident')),
  windrushDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.windrushDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.windrushDetails.length',
    }),
  ], ifPaymentsInclude('windrush')),
  bloodDetails: sf([
    r.required.bind({
      errorMsg: 'disregarded-money:field.bloodDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'disregarded-money:field.bloodDetails.length',
    }),
  ], ifPaymentsInclude('blood')),
});

module.exports = fieldValidators;
