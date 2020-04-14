const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  statePensionClaimed: sf([
    r.required.bind({
      errorMsg: 'claimed-state-pension:field.statePensionClaimed.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'claimed-state-pension:field.statePensionClaimed.required',
    }),
  ]),
});

module.exports = fieldValidators;
