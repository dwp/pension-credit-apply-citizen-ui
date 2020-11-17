const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  waitingToHearAboutBenefits: sf([
    r.required.bind({
      errorMsg: 'benefits:field.waitingToHearAboutBenefits.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'benefits:field.waitingToHearAboutBenefits.required',
    }),
  ]),
  benefitsDetails: sf([
    r.required.bind({
      errorMsg: 'benefits:field.benefitsDetails.required',
    }),
    r.strlen.bind({
      max: 500,
      errorMsgMax: 'benefits:field.benefitsDetails.length',
    }),
  ], ({ journeyContext: c, waypointId: w }) => (
    (c.getDataForPage(w) || {}).waitingToHearAboutBenefits === 'yes'
  )),
});

module.exports = fieldValidators;
