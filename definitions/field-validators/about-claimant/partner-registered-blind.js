const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  partnerRegisteredBlind: sf([
    r.required.bind({
      errorMsg: 'partner-registered-blind:field.partnerRegisteredBlind.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'partner-registered-blind:field.partnerRegisteredBlind.required',
    }),
  ]),
});

module.exports = fieldValidators;
