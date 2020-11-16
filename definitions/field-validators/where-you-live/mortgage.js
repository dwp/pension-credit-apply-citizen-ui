const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  hasMortgage: sf([
    r.required.bind({
      errorMsg: 'mortgage:field.hasMortgage.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'mortgage:field.hasMortgage.required',
    }),
  ]),
});

module.exports = fieldValidators;
