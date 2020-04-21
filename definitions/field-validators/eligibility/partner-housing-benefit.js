const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerGetsHousingBenefit: sf([
    r.required.bind({
      errorMsg: 'partner-housing-benefit:field.partnerGetsHousingBenefit.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-housing-benefit:field.partnerGetsHousingBenefit.required',
    }),
  ]),
});

module.exports = fieldValidators;
