const { validationRules: r, simpleFieldValidation: sf } = require('@dwp/govuk-casa');

const fieldValidators = Object.assign(Object.create(null), {
  paysServiceCharges: sf([
    r.required.bind({
      errorMsg: 'service-charges:field.paysServiceCharges.required',
    }),
    r.inArray.bind({
      source: ['yes', 'no'],
      errorMsg: 'service-charges:field.paysServiceCharges.required',
    }),
  ]),
});

module.exports = fieldValidators;
