const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  registeredBlind: sf([
    r.required.bind({
      errorMsg: 'registered-blind:field.registeredBlind.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'registered-blind:field.registeredBlind.required',
    }),
  ]),
});

module.exports = fieldValidators;
